// src/Components/3d/SceneCamera.tsx
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { ScreenSize, useResponsiveSize } from '../hooks/useResponsiveSize';

interface SceneCameraProps {
  position?: [number, number, number];
  fov?: number;
  near?: number;
  far?: number;
}

const SceneCamera = ({ 
  position = [0, 0, 5], 
  fov = 75, 
  near = 0.1, 
  far = 1000 
}: SceneCameraProps) => {
  const { camera } = useThree();
  const screenSize: ScreenSize = useResponsiveSize();

  useEffect(() => {
    // Update camera position based on screen size
    const responsivePosition = getResponsiveCameraPosition(screenSize);
    camera.position.set(...responsivePosition);
  }, [screenSize, camera]);

  useEffect(() => {
    // Set initial camera properties
    camera.position.set(...position);
    
    // Check if it's a PerspectiveCamera before setting FOV
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    } else if (camera instanceof THREE.OrthographicCamera) {
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    }
  }, [position, fov, near, far, camera]);

  return null;
};

// Helper function to get responsive camera position
const getResponsiveCameraPosition = (screenSize: ScreenSize): [number, number, number] => {
  switch (screenSize) {
    case 'mobile':
      return [0, 0, 8];
    case 'tablette':
      return [0, 0, 10];
    case 'laptop':
      return [0, 0, 12];
    case 'desktop':
      return [0, 0, 15];
    case '2K':
      return [0, 0, 18];
    case 'ultrawide':
      return [0, 0, 20];
    case '4k':
      return [0, 0, 25];
    default:
      return [0, 0, 12];
  }
};

export default SceneCamera;