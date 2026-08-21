import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Project } from '../types';

interface ProjectHelixGalleryProps {
  projects: Project[];
  visibleProjectIds?: string[];
  onSelect: (project: Project) => void;
  onActiveChange?: (index: number) => void;
  onCardHoverChange?: (hovered: boolean) => void;
}

const FALLBACK_TEXTURE = new URL(
  '../assets/images/blue_nile_center_model_1786542360474.jpg',
  import.meta.url,
).href;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const createCurvedGeometry = (width: number, height: number, halfArc: number) => {
  const geometry = new THREE.PlaneGeometry(width, height, 56, 10);
  const positions = geometry.attributes.position;
  const radius = (width * 0.5) / Math.sin(halfArc);
  const edgeDepth = radius * Math.cos(halfArc);

  for (let index = 0; index < positions.count; index += 1) {
    const normalized = positions.getX(index) / (width * 0.5);
    const theta = normalized * halfArc;
    positions.setX(index, radius * Math.sin(theta));
    positions.setZ(index, radius * Math.cos(theta) - edgeDepth);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
};

const createRoundedAlphaMap = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 300;
  const context = canvas.getContext('2d');

  if (context) {
    context.fillStyle = '#fff';
    context.beginPath();
    context.roundRect(1, 1, 510, 298, 22);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  return texture;
};

export const ProjectHelixGallery: React.FC<ProjectHelixGalleryProps> = ({ projects, visibleProjectIds, onSelect, onActiveChange, onCardHoverChange }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const initialVisibleIds = visibleProjectIds ?? projects.map((project) => project.id);
  const visibleIdsRef = useRef(initialVisibleIds);
  const visibleSetRef = useRef(new Set(initialVisibleIds));
  const requestedVisibleIdsRef = useRef(initialVisibleIds);
  const visibleKeyRef = useRef(initialVisibleIds.join('|'));
  const filterRevisionRef = useRef(0);

  useEffect(() => {
    const nextIds = visibleProjectIds ?? projects.map((project) => project.id);
    const nextKey = nextIds.join('|');
    if (nextKey === visibleKeyRef.current) return;
    requestedVisibleIdsRef.current = nextIds;
    visibleKeyRef.current = nextKey;
    filterRevisionRef.current += 1;
  }, [projects, visibleProjectIds]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || projects.length === 0) return;

    const scene = new THREE.Scene();
    const gallery = new THREE.Group();
    scene.add(gallery);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 10.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const geometry = createCurvedGeometry(3.65, 2.4, 0.60);
    const roundedAlphaMap = createRoundedAlphaMap();
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    // The gallery repeats projects to create the continuous helix. Reusing one
    // GPU texture per project avoids decoding/uploading the same large image
    // several times, which previously caused black cards and pointer stutter.
    const textures = new Map<string, THREE.Texture>();
    projects.forEach((project) => {
      const texture = loader.load(
        project.image,
        undefined,
        undefined,
        () => {
          loader.load(FALLBACK_TEXTURE, (fallback) => {
            fallback.colorSpace = THREE.SRGBColorSpace;
            fallback.minFilter = THREE.LinearMipmapLinearFilter;
            fallback.magFilter = THREE.LinearFilter;
            const failedTexture = textures.get(project.id);
            textures.set(project.id, fallback);
            meshes.forEach((mesh) => {
              if ((mesh.userData.project as Project).id !== project.id) return;
              const material = mesh.material as THREE.MeshBasicMaterial;
              material.map = fallback;
              material.needsUpdate = true;
            });
            failedTexture?.dispose();
          });
        },
      );
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textures.set(project.id, texture);
    });

    const repetitions = Math.max(2, Math.ceil(12 / projects.length));
    const repeatedProjects = Array.from({ length: repetitions }, () => projects).flat();
    const meshes = repeatedProjects.map((project) => {
      const material = new THREE.MeshBasicMaterial({
        map: textures.get(project.id),
        alphaMap: roundedAlphaMap,
        transparent: true,
        depthWrite: true,
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.project = project;
      mesh.userData.matched = visibleSetRef.current.has(project.id);
      gallery.add(mesh);
      return mesh;
    });
    const state = {
      position: 0,
      velocity: 0.0015,
      targetVelocity: 0.0015,
      direction: 1,
      dragging: false,
      lastX: 0,
      dragDistance: 0,
      pointerX: 0,
      pointerY: 0,
      lastTime: performance.now(),
      activeIndex: -1,
      filterRevision: filterRevisionRef.current,
      filterPhase: 'idle' as 'idle' | 'out' | 'in',
      filterStartedAt: 0,
      routeLeaving: false,
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let frame = 0;
    let cardHovering = false;
    let pointerNeedsHitTest = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const bounds = mount.getBoundingClientRect();
      renderer.setSize(bounds.width, bounds.height, false);
      camera.aspect = bounds.width / Math.max(1, bounds.height);
      camera.fov = bounds.width < 760 ? 52 : 45;
      camera.position.z = bounds.width < 760 ? 12.5 : 10.5;
      camera.updateProjectionMatrix();
    };

    const onWheel = (event: WheelEvent) => {
      state.targetVelocity = clamp(state.targetVelocity + event.deltaY * 0.00042, -0.08, 0.08);
      state.direction = event.deltaY >= 0 ? 1 : -1;
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      state.pointerX = ((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 2 - 1;
      state.pointerY = ((event.clientY - bounds.top) / Math.max(1, bounds.height)) * 2 - 1;
      pointer.set(state.pointerX, -state.pointerY);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (cardHovering) {
        cardHovering = false;
        onCardHoverChange?.(false);
      }
      state.dragging = true;
      state.lastX = event.clientX;
      state.dragDistance = 0;
      updatePointer(event);
      mount.classList.add('is-dragging');
      mount.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event);
      if (!state.dragging) {
        pointerNeedsHitTest = true;
        return;
      }

      const delta = event.clientX - state.lastX;
      state.dragDistance += Math.abs(delta);
      state.targetVelocity = clamp(state.targetVelocity - delta * 0.001, -0.08, 0.08);
      state.direction = delta < 0 ? 1 : -1;
      state.lastX = event.clientX;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!state.dragging) return;

      updatePointer(event);
      const wasClick = state.dragDistance < 6;
      state.dragging = false;
      mount.classList.remove('is-dragging');

      if (wasClick) {
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(meshes, false).find(({ object }) => {
          const material = (object as THREE.Mesh).material as THREE.MeshBasicMaterial;
          return object.userData.matched && material.opacity > 0.55;
        });
        const project = hit?.object.userData.project as Project | undefined;
        if (project) onSelect(project);
      }
    };

    const onPointerLeave = () => {
      if (!cardHovering) return;
      cardHovering = false;
      onCardHoverChange?.(false);
    };

    const onRouteLeaving = () => {
      state.routeLeaving = true;
      if (cardHovering) {
        cardHovering = false;
        onCardHoverChange?.(false);
      }
    };

    const animate = (now: number) => {
      const delta = clamp((now - state.lastTime) / 16.67, 0.5, 1.5);
      state.lastTime = now;
      if (state.routeLeaving) {
        frame = requestAnimationFrame(animate);
        return;
      }
      if (pointerNeedsHitTest && !state.dragging) {
        pointerNeedsHitTest = false;
        raycaster.setFromCamera(pointer, camera);
        const hoveringCard = raycaster.intersectObjects(meshes, false).some(({ object }) => {
          const material = (object as THREE.Mesh).material as THREE.MeshBasicMaterial;
          return object.visible && object.userData.matched && material.opacity > 0.55;
        });
        if (hoveringCard !== cardHovering) {
          cardHovering = hoveringCard;
          onCardHoverChange?.(hoveringCard);
        }
      }
      state.velocity += (state.targetVelocity - state.velocity) * 0.08;
      if (state.filterRevision !== filterRevisionRef.current) {
        state.filterRevision = filterRevisionRef.current;
        if (reduceMotion) {
          const nextIds = requestedVisibleIdsRef.current;
          visibleIdsRef.current = nextIds;
          visibleSetRef.current = new Set(nextIds);
          meshes.forEach((mesh) => {
            mesh.userData.matched = visibleSetRef.current.has((mesh.userData.project as Project).id);
          });
          state.position = 0;
          state.filterPhase = 'idle';
        } else {
          state.filterPhase = 'out';
        }
        state.filterStartedAt = now;
        if (cardHovering) {
          cardHovering = false;
          onCardHoverChange?.(false);
        }
      }

      const exitDuration = 560;
      const enterDuration = 680;
      const phaseDuration = state.filterPhase === 'out' ? exitDuration : enterDuration;
      let phaseProgress = state.filterPhase === 'idle'
        ? 1
        : clamp((now - state.filterStartedAt) / phaseDuration, 0, 1);

      if (state.filterPhase === 'out' && phaseProgress >= 1) {
        const nextIds = requestedVisibleIdsRef.current;
        visibleIdsRef.current = nextIds;
        visibleSetRef.current = new Set(nextIds);
        meshes.forEach((mesh) => {
          mesh.userData.matched = visibleSetRef.current.has((mesh.userData.project as Project).id);
        });
        state.activeIndex = -1;
        state.filterPhase = 'in';
        state.filterStartedAt = now;
        phaseProgress = 0;
      } else if (state.filterPhase === 'in' && phaseProgress >= 1) {
        state.filterPhase = 'idle';
      }

      if (state.filterPhase === 'idle') {
        state.position += state.velocity * delta;
      }
      state.targetVelocity *= 0.88;
      if (Math.abs(state.targetVelocity) < 0.0015) {
        state.targetVelocity = state.direction * 0.0015;
      }

      const angleStep = 0.78;
      const matchingMeshes = meshes.filter((mesh) => visibleSetRef.current.has((mesh.userData.project as Project).id));
      const matchingIndex = new Map(matchingMeshes.map((mesh, index) => [mesh, index]));
      const total = Math.max(1, matchingMeshes.length);
      const radius = 5;
      const pitch = 1.1;
      const totalAngle = total * angleStep;
      const halfTotalAngle = totalAngle * 0.5;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      const staggerSpan = 0.27;

      meshes.forEach((mesh) => {
        const project = mesh.userData.project as Project;
        const nextMatched = visibleSetRef.current.has(project.id);
        const material = mesh.material as THREE.MeshBasicMaterial;

        if (!nextMatched) {
          mesh.visible = false;
          material.opacity = 0;
          return;
        }

        const index = matchingIndex.get(mesh) ?? 0;
        let angle = index * angleStep - state.position * angleStep;
        while (angle < -halfTotalAngle) angle += totalAngle;
        while (angle > halfTotalAngle) angle -= totalAngle;
        const y = -angle * pitch;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius - radius;
        const order = total <= 1 ? 0 : index / (total - 1);
        const stagger = state.filterPhase === 'out' ? (1 - order) * staggerSpan : order * staggerSpan;
        const localProgress = state.filterPhase === 'idle'
          ? 1
          : clamp((phaseProgress - stagger) / (1 - staggerSpan), 0, 1);
        const easedOut = 1 - Math.pow(1 - localProgress, 3);
        const easedInOut = localProgress < 0.5
          ? 4 * localProgress * localProgress * localProgress
          : 1 - Math.pow(-2 * localProgress + 2, 3) / 2;
        const filterOpacity = state.filterPhase === 'out' ? 1 - easedInOut : easedOut;
        const filterOffsetY = state.filterPhase === 'out'
          ? -3.4 * easedInOut
          : state.filterPhase === 'in' ? 3.4 * (1 - easedOut) : 0;
        const depthLane = 0.72 + (index % 4) * 0.16;
        const filterOffsetZ = state.filterPhase === 'out'
          ? -2.4 * depthLane * easedInOut
          : state.filterPhase === 'in' ? 2.8 * depthLane * (1 - easedOut) : 0;
        const filterOffsetX = state.filterPhase === 'idle'
          ? 0
          : (index % 2 === 0 ? -1 : 1) * 0.32 * Math.sin(localProgress * Math.PI);
        const transitionTiltX = state.filterPhase === 'out'
          ? -0.16 * easedInOut
          : state.filterPhase === 'in' ? 0.2 * (1 - easedOut) : 0;
        const transitionTiltZ = state.filterPhase === 'idle'
          ? 0
          : (index % 2 === 0 ? -1 : 1) * 0.055 * Math.sin(localProgress * Math.PI);
        const transitionScale = state.filterPhase === 'out'
          ? 1 - easedInOut * 0.11
          : 0.88 + easedOut * 0.12;
        const edge = clamp((Math.abs(angle) - halfTotalAngle * 0.72) / Math.max(1, halfTotalAngle * 0.18), 0, 1);
        mesh.position.set(x + filterOffsetX, y + filterOffsetY, z + filterOffsetZ);
        mesh.rotation.order = 'YXZ';
        const targetRotationZ = -Math.atan2(pitch, radius);
        mesh.rotation.y = angle;
        mesh.rotation.z = targetRotationZ + transitionTiltZ;
        mesh.rotation.x = -state.velocity * 0.14 + transitionTiltX;
        const baseScaleY = 1 + edge * clamp(Math.abs(state.velocity) * 4.5, 0.03, 0.16);
        mesh.scale.set(transitionScale, baseScaleY * transitionScale, transitionScale);
        mesh.visible = Math.abs(mesh.position.y) < 10.5;

        const distance = Math.hypot(x, y, z);
        if (mesh.visible && distance < closestDistance) {
          closestDistance = distance;
          closestIndex = Math.max(0, visibleIdsRef.current.indexOf(project.id));
        }

        material.opacity = (1 - edge * 0.18) * filterOpacity;
        const brightness = 1 - edge * 0.07;
        material.color.setRGB(brightness, brightness, brightness);
      });

      if (closestIndex !== state.activeIndex) {
        state.activeIndex = closestIndex;
        onActiveChange?.(closestIndex);
      }

      gallery.rotation.x += (state.pointerY * -0.025 - gallery.rotation.x) * 0.06;
      gallery.rotation.y += (state.pointerX * -0.035 - gallery.rotation.y) * 0.06;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    mount.addEventListener('wheel', onWheel, { passive: true });
    mount.addEventListener('pointerdown', onPointerDown);
    mount.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('portfolio:route-leaving', onRouteLeaving);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener('wheel', onWheel);
      mount.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('portfolio:route-leaving', onRouteLeaving);
      meshes.forEach((mesh) => {
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.dispose();
      });
      new Set(textures.values()).forEach((texture) => texture.dispose());
      geometry.dispose();
      roundedAlphaMap.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [projects, onSelect, onActiveChange, onCardHoverChange]);

  return (
    <>
      <div
        ref={mountRef}
        className="project-webgl-helix absolute inset-0"
        aria-label="Interactive continuous 3D project gallery"
      />
      <div className="sr-only">
        {projects.filter((project) => !visibleProjectIds || visibleProjectIds.includes(project.id)).map((project) => (
          <button key={project.id} type="button" onClick={() => onSelect(project)}>
            Open {project.title} case study
          </button>
        ))}
      </div>
    </>
  );
};
