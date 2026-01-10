"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import * as THREE from "three"; // Ensure this is imported
import { useConfigStore } from "@/lib/config-store";

useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");

interface HyundaiModelProps {
  scrollProgress: number;
  url: string;
}

export const HyundaiModel = ({ scrollProgress, url }: HyundaiModelProps) => {
  const { scene } = useGLTF(url || "/models/car.glb");
  const group = useRef<THREE.Group>(null);
  const activeColor = useConfigStore((state) => state.activeColor);

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        
        // Handle both single materials and arrays of materials
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            // FIX: Restore visual fidelity (colorSpace)
            if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
            
            // Apply paint only to the exterior body parts
            const name = mesh.name.toLowerCase();
            if (name.includes("body") || name.includes("paint") || name.includes("exterior")) {
              mat.color.set(activeColor.hex);
              mat.metalness = activeColor.metalness ?? 0.9;
              mat.roughness = activeColor.roughness ?? 0.2;
              mat.envMapIntensity = 2;
            }
          }
        });
      }
    });
  }, [scene, activeColor]);

  useFrame((state) => {
    if (!group.current) return;
    const targetRotation = scrollProgress * Math.PI * 2;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation, 0.03);
    
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t / 2) / 20 - 1.5;
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={3} position={[0, -1.5, 0]} />
    </group>
  );
};