// src/Components/Button/Button3D.tsx
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useRef } from "react";

// Importez correctement tous les fichiers GLB
import buttonHomeGLB from '../../assets/buttonHome.glb';
import buttonAboutGLB from '../../assets/buttonAbout.glb';
import buttonProjectsGLB from '../../assets/buttonProjects.glb';
import buttonContactGLB from '../../assets/buttonContact.glb';
import buttonSettingsGLB from '../../assets/buttonSettings.glb';

interface ButtonGLTF extends GLTF {
  nodes: {
    Circle: THREE.Mesh
    Text: THREE.Mesh
    Sphere: THREE.Mesh
  }
  materials: {
    'Material.001': THREE.Material
    'Material.002': THREE.Material
    'Material.003': THREE.Material
  }
}

export type ButtonType = 'home' | 'about' | 'projects' | 'contact' | 'settings';

// Mappez chaque type à son fichier GLB correspondant
const buttonGLBMap = {
  home: buttonHomeGLB,
  about: buttonAboutGLB,
  projects: buttonProjectsGLB,
  contact: buttonContactGLB,
  settings: buttonSettingsGLB
};

// Configuration des positions et échelles pour chaque type
const buttonConfigMap = {
  home: {
    textPosition: [-0.748, 0.032, 0.127] as [number, number, number],
    textScale: 0.601
  },
  about: {
    textPosition: [-0.748, 0.032, 0.127] as [number, number, number],
    textScale: 0.601
  },
  projects: {
    textPosition: [-0.921, 0.038, 0.12] as [number, number, number],
    textScale: 0.549
  },
  contact: {
    textPosition: [-0.919, 0.038, 0.127] as [number, number, number],
    textScale: 0.574
  },
  settings: {
    textPosition: [-0.907, 0.038, 0.112] as [number, number, number],
    textScale: 0.544
  }
};

interface Button3DProps extends GroupProps {
  type: ButtonType;
  onClick?: () => void;
}

const Button3DNavigate = ({ type, onClick, ...props }: Button3DProps) => {
  const glbPath = buttonGLBMap[type];
  const config = buttonConfigMap[type];
  const { nodes, materials } = useGLTF(glbPath) as ButtonGLTF;
  const groupRef = useRef<THREE.Group>(null);

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <group 
      ref={groupRef}
      {...props} 
      dispose={null}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials['Material.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials['Material.003']}
        position={config.textPosition}
        scale={config.textScale}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials['Material.002']}
        scale={[1, 0.5, 1]}
      />
    </group>
  )
}

// Préchargement des modèles
Object.values(buttonGLBMap).forEach(glbPath => {
  useGLTF.preload(glbPath);
});

export default Button3DNavigate;