import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import moiTexture from '../assets/moi.webp';

/**
 * Props interface for the dice mesh component
 */
interface DiceMeshProps {
  textureUrl: string;
}

/**
 * 3D mesh component for a continuously rotating cube
 * Applies the provided texture to all faces
 */
const DiceMesh: React.FC<DiceMeshProps> = ({ textureUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl);

  // Animate dice rotation on each frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial map={texture} />
    </mesh>
  );
};

/**
 * Six-faced dice component with continuous rotation animation
 * Renders a 3D cube with the same texture on all faces
 */
const DiceSixFaces: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 70 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          pixelRatio: window.devicePixelRatio 
        }}
        aria-label="Rotating 3D dice"
      >
        <pointLight position={[0, 0, 2]} intensity={5} />
        <DiceMesh textureUrl={moiTexture} />
      </Canvas>
    </div>
  );
};

export default DiceSixFaces;