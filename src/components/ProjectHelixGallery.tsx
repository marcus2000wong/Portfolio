import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Project } from '../types';

interface ProjectHelixGalleryProps {
  projects: Project[];
  onSelect: (project: Project) => void;
  onActiveChange?: (index: number) => void;
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

export const ProjectHelixGallery: React.FC<ProjectHelixGalleryProps> = ({ projects, onSelect, onActiveChange }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

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

    const geometry = createCurvedGeometry(3.65, 2.4, 0.68);
    const roundedAlphaMap = createRoundedAlphaMap();
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const repetitions = Math.max(2, Math.ceil(12 / projects.length));
    const repeatedProjects = Array.from({ length: repetitions }, () => projects).flat();
    const meshes = repeatedProjects.map((project) => {
      const texture = loader.load(
        project.image,
        undefined,
        undefined,
        () => {
          loader.load(FALLBACK_TEXTURE, (fallback) => {
            fallback.colorSpace = THREE.SRGBColorSpace;
            material.map?.dispose();
            material.map = fallback;
            material.needsUpdate = true;
          });
        },
      );
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        alphaMap: roundedAlphaMap,
        transparent: true,
        depthWrite: true,
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.project = project;
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
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let frame = 0;

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
      state.dragging = true;
      state.lastX = event.clientX;
      state.dragDistance = 0;
      updatePointer(event);
      mount.classList.add('is-dragging');
      mount.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event);
      if (!state.dragging) return;

      const delta = event.clientX - state.lastX;
      state.dragDistance += Math.abs(delta);
      state.targetVelocity = clamp(state.targetVelocity - delta * 0.001, -0.08, 0.08);
      state.direction = delta < 0 ? 1 : -1;
      state.lastX = event.clientX;
    };

    const onPointerUp = (event: PointerEvent) => {
      updatePointer(event);
      const wasClick = state.dragDistance < 6;
      state.dragging = false;
      mount.classList.remove('is-dragging');

      if (wasClick) {
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(meshes, false)[0];
        const project = hit?.object.userData.project as Project | undefined;
        if (project) onSelect(project);
      }
    };

    const animate = (now: number) => {
      const delta = clamp((now - state.lastTime) / 16.67, 0.5, 1.5);
      state.lastTime = now;
      state.velocity += (state.targetVelocity - state.velocity) * 0.08;
      state.position += state.velocity * delta;
      state.targetVelocity *= 0.88;
      if (Math.abs(state.targetVelocity) < 0.0015) {
        state.targetVelocity = state.direction * 0.0015;
      }

      const total = meshes.length;
      const angleStep = 0.92;
      const radius = 5;
      const pitch = 1.16;
      const totalAngle = total * angleStep;
      const halfTotalAngle = totalAngle * 0.5;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      meshes.forEach((mesh, index) => {
        let angle = index * angleStep - state.position * angleStep;
        while (angle < -halfTotalAngle) angle += totalAngle;
        while (angle > halfTotalAngle) angle -= totalAngle;
        const y = -angle * pitch;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius - radius;
        const edge = clamp((Math.abs(angle) - halfTotalAngle * 0.72) / Math.max(1, halfTotalAngle * 0.18), 0, 1);
        mesh.position.set(x, y, z);
        mesh.rotation.order = 'YXZ';
        mesh.rotation.y = angle;
        mesh.rotation.z = -Math.atan2(pitch, radius);
        mesh.rotation.x = -state.velocity * 0.14;
        mesh.scale.y = 1 + edge * clamp(Math.abs(state.velocity) * 4.5, 0.03, 0.16);
        mesh.visible = Math.abs(y) < 8.2;

        const distance = Math.hypot(x, y, z);
        if (mesh.visible && distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index % projects.length;
        }

        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 1 - edge * 0.18;
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
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener('wheel', onWheel);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      meshes.forEach((mesh) => {
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.map?.dispose();
        material.dispose();
      });
      geometry.dispose();
      roundedAlphaMap.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [projects, onSelect, onActiveChange]);

  return (
    <>
      <div
        ref={mountRef}
        className="project-webgl-helix absolute inset-0"
        aria-label="Interactive continuous 3D project gallery"
      />
      <div className="sr-only">
        {projects.map((project) => (
          <button key={project.id} type="button" onClick={() => onSelect(project)}>
            Open {project.title} case study
          </button>
        ))}
      </div>
    </>
  );
};
