import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Original low-poly explorer model for the About section. */
export function ExplorerCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 1.6, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xc5d4df, 0x101419, 2.2));
    const key = new THREE.DirectionalLight(0xe9f6ff, 3.8);
    key.position.set(4, 7, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x9db9cf, 12, 15);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const suit = new THREE.MeshStandardMaterial({ color: 0xd7dee1, roughness: 0.8, metalness: 0.1 });
    const joint = new THREE.MeshStandardMaterial({ color: 0x20282e, roughness: 0.65, metalness: 0.25 });
    const visor = new THREE.MeshPhysicalMaterial({ color: 0x050b0e, roughness: 0.18, metalness: 0.85, clearcoat: 1 });
    const accent = new THREE.MeshStandardMaterial({ color: 0x9cbecf, roughness: 0.42, metalness: 0.45 });
    const explorer = new THREE.Group();
    explorer.position.y = -1.55;
    scene.add(explorer);

    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number, scale?: [number, number, number]) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      if (scale) mesh.scale.set(...scale);
      explorer.add(mesh);
      return mesh;
    };

    add(new THREE.CylinderGeometry(0.72, 0.88, 1.45, 20), suit, 0, 1.2, 0);
    add(new THREE.SphereGeometry(0.77, 24, 20), suit, 0, 2.35, 0, [1, 1.04, 0.94]);
    add(new THREE.SphereGeometry(0.61, 24, 20), visor, 0, 2.38, 0.48, [1, 0.72, 0.3]);
    add(new THREE.BoxGeometry(0.82, 0.82, 0.32), joint, 0, 1.45, -0.64);
    add(new THREE.BoxGeometry(0.58, 0.17, 0.16), accent, 0, 1.18, 0.73);

    const armGeometry = new THREE.CapsuleGeometry(0.16, 0.7, 6, 12);
    const leftArm = add(armGeometry, suit, -0.9, 1.3, 0);
    leftArm.rotation.z = 0.28;
    const rightArm = add(armGeometry, suit, 0.9, 1.3, 0);
    rightArm.rotation.z = -0.28;
    add(new THREE.SphereGeometry(0.21, 14, 12), joint, -1.08, 0.75, 0.03);
    add(new THREE.SphereGeometry(0.21, 14, 12), joint, 1.08, 0.75, 0.03);

    const legGeometry = new THREE.CapsuleGeometry(0.23, 0.72, 6, 12);
    add(legGeometry, suit, -0.36, 0.05, 0);
    add(legGeometry, suit, 0.36, 0.05, 0);
    add(new THREE.BoxGeometry(0.52, 0.24, 0.78), joint, -0.36, -0.47, 0.18);
    add(new THREE.BoxGeometry(0.52, 0.24, 0.78), joint, 0.36, -0.47, 0.18);

    const stars = new THREE.BufferGeometry();
    const points = new Float32Array(450 * 3);
    for (let i = 0; i < points.length; i += 3) {
      const radius = 2.3 + Math.random() * 3.4;
      const angle = Math.random() * Math.PI * 2;
      points[i] = Math.cos(angle) * radius;
      points[i + 1] = Math.random() * 5 - 1.1;
      points[i + 2] = Math.sin(angle) * radius - 1.5;
    }
    stars.setAttribute('position', new THREE.BufferAttribute(points, 3));
    const particles = new THREE.Points(stars, new THREE.PointsMaterial({ color: 0xc8e4ef, size: 0.035, transparent: true, opacity: 0.72, sizeAttenuation: true }));
    scene.add(particles);

    const floor = new THREE.Mesh(new THREE.CircleGeometry(4, 48), new THREE.MeshBasicMaterial({ color: 0x8faaba, transparent: true, opacity: 0.08 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.62;
    scene.add(floor);

    let targetX = 0;
    const pointer = (event: PointerEvent) => { targetX = ((event.clientX - mount.getBoundingClientRect().left) / mount.clientWidth - 0.5) * 0.7; };
    mount.addEventListener('pointermove', pointer);
    let animation = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const time = clock.getElapsedTime();
      explorer.rotation.y += (targetX - explorer.rotation.y) * 0.045;
      explorer.position.y = -1.55 + Math.sin(time * 1.25) * 0.06;
      particles.rotation.y = time * 0.035;
      renderer.render(scene, camera);
      animation = requestAnimationFrame(render);
    };
    render();

    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animation);
      mount.removeEventListener('pointermove', pointer);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-80 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080d12] sm:h-96" aria-label="Interactive 3D explorer model" />;
}
