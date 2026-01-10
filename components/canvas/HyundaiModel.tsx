"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { useConfigStore } from "@/lib/config-store";

// FIX: Instead of defining the loader inside the component (which causes TS errors),
// we set the Decoder Path globally. This is faster and error-free.
useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");

interface HyundaiModelProps {
  scrollProgress: number;
  url: string;
}

export const HyundaiModel = ({ scrollProgress, url }: HyundaiModelProps) => {
  // Use the provided URL from Sanity, or fallback to local
  const { scene } = useGLTF(url || "/models/car.glb");
  
  const group = useRef<THREE.Group>(null);
  const activeColor = useConfigStore((state) => state.activeColor);

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        
        // Target automotive paint layers
        if (
          mesh.name.toLowerCase().includes("body") || 
          mesh.name.toLowerCase().includes("paint") ||
          mesh.name.toLowerCase().includes("exterior")
        ) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: activeColor.hex,
            metalness: activeColor.metalness,
            roughness: activeColor.roughness,
            envMapIntensity: 1.5,
          });
        }
      }
    });
  }, [scene, activeColor]);

  useFrame((state) => {
    if (!group.current) return;

    // Automotive 360 rotation based on scroll
    const targetRotation = scrollProgress * Math.PI * 2;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y, 
      targetRotation, 
      0.05
    );

    // Subtle floating engine idle animation
    const t = state.clock.getElapsedTime();
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y, 
      Math.sin(t / 2) / 15 - 1, 
      0.1
    );
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={2.2} position={[0, -1, 0]} />
    </group>
  );
};