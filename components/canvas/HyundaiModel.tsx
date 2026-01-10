"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { useConfigStore } from "@/lib/config-store";

interface HyundaiModelProps {
  scrollProgress: number;
}

export const HyundaiModel = ({ scrollProgress }: HyundaiModelProps) => {
  // 1. LOAD MODEL: Ensure your file is at public/models/car.glb
  // Using useGLTF is high-performance as it caches the model
  const { scene } = useGLTF("/models/car.glb");
  const group = useRef<THREE.Group>(null);

  // 2. CONNECT TO STORE: Get the currently selected color
  const activeColor = useConfigStore((state) => state.activeColor);

  // 3. THE "PAINT SHOP" LOGIC:
  // useLayoutEffect runs before the car is rendered, preventing "color flickering"
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      // Check if the object is a 3D Mesh
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;

        /* 
           AUTOMOTIVE MATERIAL TARGETING:
           We look for meshes that have "body", "paint", or "exterior" in their names.
           This is standard for Hyundai/car models from Sketchfab/Blender.
        */
        if (
          mesh.name.toLowerCase().includes("body") || 
          mesh.name.toLowerCase().includes("paint") ||
          mesh.name.toLowerCase().includes("exterior")
        ) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: activeColor.hex,
            metalness: activeColor.metalness, // FIXED: Removed redundant .activeColor
            roughness: activeColor.roughness, // FIXED: Removed redundant .activeColor
            envMapIntensity: 1.5, // Makes the 'city' reflections look sharper
          });
        }

        // OPTIONAL: Make windows transparent
        if (mesh.name.toLowerCase().includes("glass") || mesh.name.toLowerCase().includes("window")) {
           mesh.material = new THREE.MeshPhysicalMaterial({
             transparent: true,
             opacity: 0.3,
             color: "#111",
             metalness: 1,
             roughness: 0,
           });
        }
      }
    });
  }, [scene, activeColor]);

  // 4. AUTOMOTIVE MOTION LOGIC:
  // Runs 60 times per second for buttery smooth movement
  useFrame((state) => {
    if (!group.current) return;

    // A. ROTATION: Performs one full 360-degree spin as the user scrolls
    const targetRotation = scrollProgress * Math.PI * 2;
    
    // Lerp (Linear Interpolation) makes the stop/start feel "expensive" and heavy
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y, 
      targetRotation, 
      0.05
    );

    // B. FLOATING ANIMATION: Subtle "breathing" effect so the car feels alive
    const t = state.clock.getElapsedTime();
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y, 
      Math.sin(t / 2) / 15 - 1, // Floats slightly above floor
      0.1
    );
  });

  return (
    <group ref={group} dispose={null}>
      {/* 
         Scaling: 2.2 is usually perfect for car models. 
         Position: -1 puts it on the 'floor' we built in VehicleCanvas.
      */}
      <primitive 
        object={scene} 
        scale={2.2} 
        position={[0, -1, 0]} 
      />
    </group>
  );
};

// PRE-LOAD: Optimizes performance by loading the car while the splash screen is visible
useGLTF.preload("/models/car.glb");