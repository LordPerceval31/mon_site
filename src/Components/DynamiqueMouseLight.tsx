import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface DynamicMouseLightProps {
  intensity?: number;
  influenceRadius?: number; // How far from the button the mouse affects the light
}

const DynamicMouseLight: React.FC<DynamicMouseLightProps> = ({ 
  intensity = 1,
  influenceRadius = 300 // pixels
}) => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const { gl } = useThree();
  
  // Track global mouse position and calculate relative position to this canvas
  const handleMouseMove = (event: MouseEvent) => {
    // Get the canvas element and its bounding rect
    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate center of this canvas
    const canvasCenterX = rect.left + rect.width / 2;
    const canvasCenterY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to canvas center
    const relativeX = event.clientX - canvasCenterX;
    const relativeY = event.clientY - canvasCenterY;
    
    // Calculate distance from mouse to canvas center
    const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
    
    // Calculate influence factor (1 when mouse is on center, 0 when at influenceRadius)
    const influence = Math.max(0, 1 - distance / influenceRadius);
    
    // Update mouse position with influence
    // When influence is 0, light stays at default position
    // When influence is 1, light follows mouse completely
    mousePosition.current.x = (relativeX / rect.width) * 2 * influence;
    mousePosition.current.y = -(relativeY / rect.height) * 2 * influence;
  };
  
  // Add event listener on mount
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl.domElement, influenceRadius]);
  
  // Update light position every frame
  useFrame(() => {
    if (lightRef.current) {
      // Convert to 3D space
      const targetX = mousePosition.current.x * 5;
      const targetY = mousePosition.current.y * 5;
      
      // Smooth transition using lerp
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        targetX,
        0.1
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        targetY,
        0.1
      );
      
      // Adjust Z position based on mouse proximity
      const targetZ = 5 - Math.abs(mousePosition.current.x + mousePosition.current.y) * 0.5;
      lightRef.current.position.z = THREE.MathUtils.lerp(
        lightRef.current.position.z,
        targetZ,
        0.1
      );
      
      // Optional: Adjust intensity based on mouse proximity
      const distanceIntensity = intensity * (0.7 + 0.3 * Math.max(Math.abs(mousePosition.current.x), Math.abs(mousePosition.current.y)));
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        distanceIntensity,
        0.1
      );
    }
  });
  
  return (
    <directionalLight
      ref={lightRef}
      position={[0, 0, 5]}
      intensity={intensity}
      castShadow
    />
  );
};

export default DynamicMouseLight;