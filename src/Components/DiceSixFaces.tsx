
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import moiTexture from '../assets/moi.webp';

interface DiceMeshProps {
  textureUrl: string;
}

const DiceMesh: React.FC<DiceMeshProps> = ({ textureUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl);

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
      >
        <pointLight position={[0, 0, 2]} intensity={5} />
        <DiceMesh textureUrl={moiTexture} />
      </Canvas>
    </div>
  );
};

export default DiceSixFaces;