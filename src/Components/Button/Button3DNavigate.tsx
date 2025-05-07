import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GroupProps, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

// 3D button models imports
import buttonHomeGLB from "../../assets/buttonHome.glb";
import buttonAboutGLB from "../../assets/buttonAbout.glb";
import buttonProjectsGLB from "../../assets/buttonProjects.glb";
import buttonContactGLB from "../../assets/buttonContact.glb";
import buttonSettingsGLB from "../../assets/buttonSettings.glb";

export type ButtonType = "home" | "about" | "projects" | "contact" | "settings";

// Map button types to GLB files
const buttonGLBMap = {
  home: buttonHomeGLB,
  about: buttonAboutGLB,
  projects: buttonProjectsGLB,
  contact: buttonContactGLB,
  settings: buttonSettingsGLB,
};

type GLTFResult = GLTF & {
  nodes: {
    Circle: THREE.Mesh;
    Text: THREE.Mesh;
    Sphere: THREE.Mesh;
  };
  materials: {
    "Material.001": THREE.MeshStandardMaterial;
    "Material.002": THREE.MeshStandardMaterial;
    "Material.003": THREE.MeshStandardMaterial;
  };
};

interface Button3DNavigateProps extends GroupProps {
  type: ButtonType;
  color?: THREE.ColorRepresentation;
  textColor?: THREE.ColorRepresentation;
  onClick?: () => void;
}

// Button text position and scale configuration for each type
const buttonConfigMap = {
  home: {
    textPosition: [-0.788, 0.032, 0.127] as [number, number, number],
    textScale: 1,
  },
  about: {
    textPosition: [-0.748, 0.032, 0.127] as [number, number, number],
    textScale: 0.9,
  },
  projects: {
    textPosition: [-0.9, 0.038, 0.12] as [number, number, number],
    textScale: 0.8,
  },
  contact: {
    textPosition: [-0.85, 0.038, 0.127] as [number, number, number],
    textScale: 0.8,
  },
  settings: {
    textPosition: [-0.907, 0.038, 0.112] as [number, number, number],
    textScale: 0.8,
  },
};


 // 3D Navigation Button component using GLB models

const Button3DNavigate = ({
  type,
  color = "blue",
  textColor = "white",
  onClick,
  ...props
}: Button3DNavigateProps) => {
  // Color transition states
  const [targetColorState, setTargetColorState] = useState(new THREE.Color(color));
  const [targetTextColorState, setTargetTextColorState] = useState(new THREE.Color(textColor));
  
  const glbPath = buttonGLBMap[type];
  const config = buttonConfigMap[type];
  const groupRef = useRef<THREE.Group>(null);
  
  // Load 3D model
  const { nodes, materials } = useGLTF(glbPath) as GLTFResult;

  // Update target colors when props change
  useEffect(() => {
    setTargetColorState(new THREE.Color(color));
    setTargetTextColorState(new THREE.Color(textColor));
  }, [color, textColor]);

  // Smooth color transition animation
  useFrame(() => {
    if (materials["Material.002"]) {
      materials["Material.002"].color.lerp(targetColorState, 0.1);
      materials["Material.002"].needsUpdate = true;
    }

    if (materials["Material.003"]) {
      materials["Material.003"].color.lerp(targetTextColorState, 0.1);
      materials["Material.003"].needsUpdate = true;
    }
  });

  // Event handlers for button interactivity
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
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
        material={materials["Material.002"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials["Material.003"]}
        position={config.textPosition}
        scale={config.textScale}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials["Material.001"]}
        scale={[1.015, 0.5, 1.015]}
      />
    </group>
  );
};

// Preload all button models for better performance
Object.values(buttonGLBMap).forEach((glbPath) => {
  useGLTF.preload(glbPath);
});

export default Button3DNavigate;