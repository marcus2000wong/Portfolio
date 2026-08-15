import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeDAvatarCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 2. LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light (Warm Orange)
    const keyLight = new THREE.DirectionalLight(0xff9e5e, 2.8);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Fill Light (Cool Teal/Mint)
    const fillLight = new THREE.DirectionalLight(0x2dd4bf, 2.2);
    fillLight.position.set(-4, 3, 3);
    scene.add(fillLight);

    // Back / Rim Light (Vibrant Orange Accent)
    const rimLight = new THREE.DirectionalLight(0xff5522, 3.5);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Bottom Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xa7f3d0, 0.8);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // 3. MATERIALS
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffdfc4,
      roughness: 0.45,
      metalness: 0.05,
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.3,
      metalness: 0.1,
    });

    const jacketMaterial = new THREE.MeshStandardMaterial({
      color: 0x34d399, // Mint Green
      roughness: 0.5,
      metalness: 0.1,
    });

    const hoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Off-white
      roughness: 0.7,
      metalness: 0.0,
    });

    const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    });

    const pupilMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.3,
    });

    const glassesMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x27272a,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
    });

    const glassLensMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      transmission: 0.6,
      ior: 1.5,
    });

    const penBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.2,
      metalness: 0.8,
    });

    const penTipMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5522,
      emissive: 0xff5522,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });

    const cardBgMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x18181b,
      roughness: 0.3,
      metalness: 0.2,
      clearcoat: 0.5,
    });

    // 4. BUILDING 3D AVATAR CHARACTER
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, -1.2, 0);
    scene.add(characterGroup);

    // --- BODY / TORSO & HOODIE ---
    const bodyGroup = new THREE.Group();
    characterGroup.add(bodyGroup);

    // Hoodie Base
    const torsoGeo = new THREE.CylinderGeometry(0.85, 1.1, 1.8, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, hoodieMaterial);
    torsoMesh.position.y = 0.9;
    torsoMesh.castShadow = true;
    bodyGroup.add(torsoMesh);

    // Mint Jacket Outer
    const jacketGeo = new THREE.CylinderGeometry(0.92, 1.15, 1.6, 32, 1, false, Math.PI * 0.15, Math.PI * 1.7);
    const jacketMesh = new THREE.Mesh(jacketGeo, jacketMaterial);
    jacketMesh.position.y = 0.85;
    jacketMesh.castShadow = true;
    bodyGroup.add(jacketMesh);

    // Hoodie Drawstrings
    const stringGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.6, 16);
    const stringLeft = new THREE.Mesh(stringGeo, hoodieMaterial);
    stringLeft.position.set(-0.25, 1.1, 0.88);
    stringLeft.rotation.z = -0.1;
    bodyGroup.add(stringLeft);

    const stringRight = new THREE.Mesh(stringGeo, hoodieMaterial);
    stringRight.position.set(0.25, 1.1, 0.88);
    stringRight.rotation.z = 0.1;
    bodyGroup.add(stringRight);

    // Arms & Hands
    const armGeo = new THREE.CylinderGeometry(0.22, 0.2, 1.2, 16);
    
    // Left Arm
    const leftArm = new THREE.Mesh(armGeo, jacketMaterial);
    leftArm.position.set(-1.1, 0.9, 0.1);
    leftArm.rotation.z = 0.35;
    leftArm.rotation.x = 0.2;
    bodyGroup.add(leftArm);

    // Right Arm (Holding Stylus)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(1.0, 0.9, 0.2);
    bodyGroup.add(rightArmGroup);

    const rightArm = new THREE.Mesh(armGeo, jacketMaterial);
    rightArm.position.set(0.1, -0.2, 0.2);
    rightArm.rotation.z = -0.4;
    rightArm.rotation.x = -0.5;
    rightArmGroup.add(rightArm);

    // Hand
    const handGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const handMesh = new THREE.Mesh(handGeo, skinMaterial);
    handMesh.position.set(0.4, -0.6, 0.6);
    rightArmGroup.add(handMesh);

    // Stylus Pen in Hand
    const penGroup = new THREE.Group();
    penGroup.position.set(0.4, -0.5, 0.7);
    penGroup.rotation.x = 0.8;
    penGroup.rotation.y = -0.4;
    penGroup.rotation.z = -0.2;
    rightArmGroup.add(penGroup);

    const penBody = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.7, 16), penBodyMaterial);
    penGroup.add(penBody);

    const penTip = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.12, 16), penTipMaterial);
    penTip.position.y = 0.38;
    penGroup.add(penTip);


    // --- 3D HEAD GROUP (ROTATES WITH CURSOR!) ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.1, 0);
    characterGroup.add(headGroup);

    // Head Base (Rounded Sphere)
    const headGeo = new THREE.SphereGeometry(0.82, 32, 32);
    headGeo.scale(1.0, 1.05, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.2, 16, 16);
    earGeo.scale(0.6, 1.0, 0.8);
    
    const leftEar = new THREE.Mesh(earGeo, skinMaterial);
    leftEar.position.set(-0.82, 0, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, skinMaterial);
    rightEar.position.set(0.82, 0, 0);
    headGroup.add(rightEar);

    // Nose
    const noseGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
    noseMesh.position.set(0, -0.05, 0.82);
    headGroup.add(noseMesh);

    // Eyes
    const eyeWhiteGeo = new THREE.SphereGeometry(0.16, 24, 24);
    eyeWhiteGeo.scale(1.1, 1.2, 0.6);

    const pupilGeo = new THREE.SphereGeometry(0.08, 20, 20);

    // Left Eye Socket
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.3, 0.12, 0.72);
    headGroup.add(leftEyeGroup);

    const leftEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMaterial);
    leftEyeGroup.add(leftEyeWhite);

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(0, 0, 0.1);
    leftEyeGroup.add(leftPupil);

    // Right Eye Socket
    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.3, 0.12, 0.72);
    headGroup.add(rightEyeGroup);

    const rightEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMaterial);
    rightEyeGroup.add(rightEyeWhite);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    rightPupil.position.set(0, 0, 0.1);
    rightEyeGroup.add(rightPupil);

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.25, 0.05, 0.06);
    
    const leftBrow = new THREE.Mesh(browGeo, hairMaterial);
    leftBrow.position.set(-0.3, 0.36, 0.76);
    leftBrow.rotation.z = -0.08;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, hairMaterial);
    rightBrow.position.set(0.3, 0.36, 0.76);
    rightBrow.rotation.z = 0.08;
    headGroup.add(rightBrow);

    // Smile Line
    const smileGeo = new THREE.TorusGeometry(0.14, 0.03, 12, 24, Math.PI);
    const smileMesh = new THREE.Mesh(smileGeo, new THREE.MeshBasicMaterial({ color: 0x9f1239 }));
    smileMesh.position.set(0, -0.25, 0.78);
    smileMesh.rotation.x = Math.PI;
    headGroup.add(smileMesh);

    // Stylized Anime Hair (Multiple tufts & top volume)
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    const mainHairCap = new THREE.Mesh(new THREE.SphereGeometry(0.86, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55), hairMaterial);
    mainHairCap.position.y = 0.08;
    hairGroup.add(mainHairCap);

    // Front Hair Bangs
    const bangGeo = new THREE.ConeGeometry(0.2, 0.5, 12);
    
    for (let i = -3; i <= 3; i++) {
      const bang = new THREE.Mesh(bangGeo, hairMaterial);
      bang.position.set(i * 0.22, 0.65, 0.72 - Math.abs(i) * 0.06);
      bang.rotation.x = 2.2 + Math.random() * 0.2;
      bang.rotation.z = -i * 0.15;
      hairGroup.add(bang);
    }

    // Top Hair Fluff
    const topFluff = new THREE.Mesh(new THREE.DodecahedronGeometry(0.38), hairMaterial);
    topFluff.position.set(0, 0.88, 0.1);
    topFluff.rotation.y = 0.4;
    hairGroup.add(topFluff);

    // --- ROUND DESIGNER GLASSES ---
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.12, 0.74);
    headGroup.add(glassesGroup);

    const rimGeo = new THREE.TorusGeometry(0.22, 0.025, 16, 32);
    const lensGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.02, 32);
    lensGeo.rotateX(Math.PI / 2);

    // Left Frame & Lens
    const leftRim = new THREE.Mesh(rimGeo, glassesMaterial);
    leftRim.position.x = -0.32;
    glassesGroup.add(leftRim);

    const leftLens = new THREE.Mesh(lensGeo, glassLensMaterial);
    leftLens.position.x = -0.32;
    glassesGroup.add(leftLens);

    // Right Frame & Lens
    const rightRim = new THREE.Mesh(rimGeo, glassesMaterial);
    rightRim.position.x = 0.32;
    glassesGroup.add(rightRim);

    const rightLens = new THREE.Mesh(lensGeo, glassLensMaterial);
    rightLens.position.x = 0.32;
    glassesGroup.add(rightLens);

    // Bridge
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.2, 12), glassesMaterial);
    bridge.rotation.z = Math.PI / 2;
    glassesGroup.add(bridge);


    // --- 5. FLOATING 3D ENVIRONMENT ELEMENTS ---
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // 3D Card 1: UI Wireframe Panel (Top Left)
    const card1Group = new THREE.Group();
    card1Group.position.set(-2.2, 1.4, 0.8);
    card1Group.rotation.set(0.1, 0.3, -0.1);
    floatingGroup.add(card1Group);

    const card1Mesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 0.06), cardBgMaterial);
    card1Group.add(card1Mesh);

    // UI Wireframe lines on card
    const lineMat1 = new THREE.MeshBasicMaterial({ color: 0x2dd4bf });
    const lineMat2 = new THREE.MeshBasicMaterial({ color: 0x52525b });

    const wireLine1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.08), lineMat1);
    wireLine1.position.set(-0.15, 0.28, 0.02);
    card1Group.add(wireLine1);

    const wireLine2 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.05, 0.08), lineMat2);
    wireLine2.position.set(-0.05, 0.08, 0.02);
    card1Group.add(wireLine2);

    const wireLine3 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 0.08), lineMat2);
    wireLine3.position.set(-0.2, -0.1, 0.02);
    card1Group.add(wireLine3);


    // 3D Card 2: Color Palette Swatch (Bottom Right)
    const card2Group = new THREE.Group();
    card2Group.position.set(2.3, -0.6, 1.0);
    card2Group.rotation.set(-0.1, -0.3, 0.1);
    floatingGroup.add(card2Group);

    const card2Mesh = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 0.06), cardBgMaterial);
    card2Group.add(card2Mesh);

    const colors = [0xff5522, 0xf59e0b, 0x10b981, 0x6366f1];
    colors.forEach((col, idx) => {
      const chip = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.5, 0.08),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.2 })
      );
      chip.position.set(-0.36 + idx * 0.24, 0, 0.02);
      card2Group.add(chip);
    });

    // Floating 3D Badge (Bottom Left)
    const badgeGroup = new THREE.Group();
    badgeGroup.position.set(-2.0, -1.2, 1.2);
    floatingGroup.add(badgeGroup);

    const badgeMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24),
      new THREE.MeshStandardMaterial({ color: 0xff5522, emissive: 0xff5522, emissiveIntensity: 0.4 })
    );
    badgeMesh.rotation.x = Math.PI / 2;
    badgeGroup.add(badgeMesh);


    // 6. MOUSE TRACKING & ANIMATION LOOP
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetMouse.x = Math.max(-1, Math.min(1, normX));
      targetMouse.y = Math.max(-1, Math.min(1, normY));
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp for mouse position
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;

      // --- REAL 3D MODEL HEAD ROTATION! ---
      // Head Yaw (Left/Right look up to ~45 deg)
      headGroup.rotation.y = currentMouse.x * 0.75;
      // Head Pitch (Up/Down look up to ~35 deg)
      headGroup.rotation.x = -currentMouse.y * 0.55;
      // Head Roll (Subtle tilt)
      headGroup.rotation.z = currentMouse.x * 0.12;

      // Torso / Body slight rotation following head
      bodyGroup.rotation.y = currentMouse.x * 0.25;
      bodyGroup.rotation.x = -currentMouse.y * 0.12;

      // Eye Pupils shift slightly inside eye sockets for gaze tracking
      leftPupil.position.x = currentMouse.x * 0.04;
      leftPupil.position.y = currentMouse.y * 0.04;

      rightPupil.position.x = currentMouse.x * 0.04;
      rightPupil.position.y = currentMouse.y * 0.04;

      // Stylus Pen subtle movement
      penGroup.rotation.z = -0.2 + currentMouse.x * 0.2;

      // Gentle floating animation for surrounding 3D cards
      card1Group.position.y = 1.4 + Math.sin(elapsedTime * 1.5) * 0.08;
      card1Group.rotation.y = 0.3 + currentMouse.x * 0.2;

      card2Group.position.y = -0.6 + Math.cos(elapsedTime * 1.8) * 0.08;
      card2Group.rotation.y = -0.3 + currentMouse.x * 0.2;

      badgeGroup.position.y = -1.2 + Math.sin(elapsedTime * 2.0) * 0.06;
      badgeGroup.rotation.z = elapsedTime * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // 7. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // CLEANUP ON UNMOUNT
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] sm:min-h-[480px] md:min-h-[540px] relative cursor-grab active:cursor-grabbing select-none"
    />
  );
};
