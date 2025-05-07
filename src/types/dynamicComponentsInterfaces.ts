import { GroupProps } from "@react-three/fiber";
import React from "react";

// Interface de base pour les propriétés communes
export interface DynamicComponentProps {
  influenceRadius?: number;
}

// Interface pour les composants réagissant à la souris
export interface MouseInteractiveProps extends DynamicComponentProps {
  intensity?: number;
}

// Interface spécifique pour DynamicMouseLight
export interface DynamicMouseLightProps extends MouseInteractiveProps {
}

// Interface pour les composants avec rotation
export interface RotationProps {
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  resetSpeed?: number;
  rotationIntensity?: {
    x: number;
    y: number;
    z: number;
  };
}

// Interface spécifique pour DynamicButton3D
export interface DynamicButton3DProps extends GroupProps, DynamicComponentProps, RotationProps {
  children: React.ReactNode;
  baseRotation?: [number, number, number];
  resetRadius?: number;
}