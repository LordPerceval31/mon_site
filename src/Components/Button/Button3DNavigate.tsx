// src/Components/Button/Button3DNavigate.tsx
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useRef, useEffect } from "react";

// Import all button GLB files
import buttonHomeGLB from '../../assets/ButtonTest.glb';
import buttonAboutGLB from '../../assets/ButtonAbout.glb';
import buttonProjectsGLB from '../../assets/ButtonProjects.glb';
import buttonContactGLB from '../../assets/ButtonContact.glb';
import buttonSettingsGLB from '../../assets/ButtonSettings.glb';

// Define type for the button variants
export type ButtonType = 'home' | 'about' | 'projects' | 'contact' | 'settings';

// Map each button type to its GLB file
const buttonGLBMap = {
  home: buttonHomeGLB,
  about: buttonAboutGLB,
  projects: buttonProjectsGLB,
  contact: buttonContactGLB,
  settings: buttonSettingsGLB
};

// Type for the GLB model structure
type GLTFResult = GLTF & {
  nodes: {
    Circle: THREE.Mesh;
    Text: THREE.Mesh;
    Sphere: THREE.Mesh;
  };
  materials: {
    'Material.001': THREE.MeshStandardMaterial;
    'Material.002': THREE.MeshStandardMaterial;
    'Material.003': THREE.MeshStandardMaterial;
  };
};

// Component props interface
interface Button3DNavigateProps extends GroupProps {
  type: ButtonType;
  color?: THREE.ColorRepresentation;
  textColor?: THREE.ColorRepresentation;
  onClick?: () => void;
}

// Configuration des positions et échelles pour chaque type
const buttonConfigMap = {
  home: {
    textPosition: [-0.788, 0.032, 0.127] as [number, number, number],
    textScale: 1
  },
  about: {
    textPosition: [-0.748, 0.032, 0.127] as [number, number, number],
    textScale: 0.9
  },
  projects: {
    textPosition: [-0.9, 0.038, 0.12] as [number, number, number],
    textScale: 0.8
  },
  contact: {
    textPosition: [-0.850, 0.038, 0.127] as [number, number, number],
    textScale: 0.8
  },
  settings: {
    textPosition: [-0.907, 0.038, 0.112] as [number, number, number],
    textScale: 0.8
  }
};

const Button3DNavigate = ({ 
  type,
  color = 'blue', 
  textColor = 'white', 
  onClick, 
  ...props 
}: Button3DNavigateProps) => {
  // Get the correct GLB path based on button type
  const glbPath = buttonGLBMap[type];
  const config = buttonConfigMap[type];
  
  // Load the GLB model
  const { nodes, materials } = useGLTF(glbPath) as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);

  // Update material colors when props change
  useEffect(() => {
    if (materials['Material.002']) {
      materials['Material.002'].color = new THREE.Color(color);
    }
    
    if (materials['Material.003']) {
      materials['Material.003'].color = new THREE.Color(textColor);
    }
  }, [color, textColor, materials]);
  
  // Event handlers for interactivity
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
        material={materials['Material.002']}
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
        material={materials['Material.001']}
        scale={[1.015, 0.5, 1.015]}
      />
    </group>
  );
};

// Preload all button models for better performance
Object.values(buttonGLBMap).forEach(glbPath => {
  useGLTF.preload(glbPath);
});

export default Button3DNavigate;


