import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DynamicButton3DProps } from '../types/dynamicComponentsInterfaces';

/**
 * 3D button component that reacts dynamically to mouse movements
 * Features smooth rotation, automatic animation and scaling effects
 */
const DynamicButton3D: React.FC<DynamicButton3DProps> = ({
  children,
  baseRotation = [Math.PI / 2, 0, 0],
  influenceRadius = 200,  
  resetRadius = 300,
  rotationIntensity = { x: 0.8, y: 0.8, z: 0.4 },
  autoRotate = true,
  autoRotateSpeed = 0.002,
  resetSpeed = 0.05,
  ...props
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useRef({ x: 0, y: 0, distance: Infinity });
  const { gl } = useThree();
  const time = useRef(0);
  
  // Track mouse position relative to this specific button
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate canvas-specific center point
      const canvas = gl.domElement;
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Get distance from mouse to this button's center
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Store relative position data
      mousePosition.current = {
        x: dx,
        y: dy,
        distance: distance
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gl.domElement]);
  
  // Animation loop for rotation and scaling effects
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    
    time.current += delta;
    const { x, y, distance } = mousePosition.current;
    
    // Start with base rotation values
    let targetRotX = baseRotation[0];
    let targetRotY = baseRotation[1];
    let targetRotZ = baseRotation[2];
    
    if (distance < resetRadius) {
      // Calculate mouse influence strength
      const influence = Math.max(0, 1 - distance / influenceRadius);
      
      // Apply mouse-based rotation with intensity scaling
      targetRotX += (-y / 100) * rotationIntensity.x * influence;
      targetRotY += (x / 100) * rotationIntensity.y * influence;
      targetRotZ += ((x * y) / 10000) * rotationIntensity.z * influence;
    }
    
    // Apply gentle oscillation when mouse is far away
    if (autoRotate && distance > influenceRadius) {
      const autoInfluence = Math.min(1, (distance - influenceRadius) / 100);
      targetRotX += Math.sin(time.current * autoRotateSpeed) * 0.1 * autoInfluence;
      targetRotY += Math.cos(time.current * autoRotateSpeed) * 0.1 * autoInfluence;
    }
    
    // Apply smooth transition between current and target rotation
    const lerpSpeed = distance > resetRadius ? resetSpeed : 0.1;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      lerpSpeed
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      lerpSpeed
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      lerpSpeed
    );
    
    // Apply subtle scale effect based on proximity
    const targetScale = distance < influenceRadius 
      ? 3 + (1 - distance / influenceRadius) * 0.2 
      : 3;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
    );
  });
  
  return (
    <group ref={groupRef} {...props}>
      {children}
    </group>
  );
};

export default DynamicButton3D;