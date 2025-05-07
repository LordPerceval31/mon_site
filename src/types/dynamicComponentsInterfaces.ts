import { GroupProps } from "@react-three/fiber";
import React from "react";

//Base interface for all dynamic components
export interface DynamicComponentProps {
  influenceRadius?: number;
}

// Interface for components that respond to mouse interactions
export interface MouseInteractiveProps extends DynamicComponentProps {
  intensity?: number;
}

// Specific interface for DynamicMouseLight component
export interface DynamicMouseLightProps extends MouseInteractiveProps {

}

//Interface for components with rotation capabilities
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

// Specific interface for DynamicButton3D component
export interface DynamicButton3DProps extends GroupProps, DynamicComponentProps, RotationProps {
  children: React.ReactNode;               
  baseRotation?: [number, number, number]; 
  resetRadius?: number;                    
}