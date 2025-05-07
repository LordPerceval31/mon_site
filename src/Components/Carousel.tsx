import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import useTheme from '../hooks/useTheme';
import { useResponsiveSize } from '../hooks/useResponsiveSize';
import CardTest from './Card';
import { CarouselCardType, useNavigation } from '../contexts/NavigationContext';

/**
 * Props interface for the 3D rotating carousel
 */
type CarouselProps = {
  radius?: number;
  cardColor?: string; 
  textColor?: string;
  rotationSpeed?: number;
  zoomFactor?: number;
  zoomSpeed?: number; 
};

// Available cards in the carousel
const cardItems: CarouselCardType[] = ['About', 'Projects', 'Contact', 'Settings'];

/**
 * 3D Carousel component that displays cards in a circular arrangement
 * Features automatic rotation, interactive zoom, and synchronization with navigation context
 */
export const Carousel = ({
  radius = 2,
  cardColor, 
  textColor,
  rotationSpeed = 0.2,
  zoomFactor = 0.7,
  zoomSpeed = 0.03
}: CarouselProps) => {
  // Refs for rotation, animation and position tracking
  const groupRef = useRef<THREE.Group>(null);
  const defaultZ = useRef(5);
  const targetRotationY = useRef<number | null>(null);
  const initialRotation = useRef<number>(0);
  const isFirstRender = useRef<boolean>(true);
  
  // Interactive state
  const [isHovering, setIsHovering] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  
  // Hooks for theme, responsiveness and navigation
  const { colors, isDarkMode } = useTheme();
  const screenSize = useResponsiveSize();
  const { camera } = useThree();
  const { currentCard, setCurrentCard, isRotating, isAutoRotationEnabled } = useNavigation();
  
  // Derived values for responsiveness and theming
  const isMobileOrTablet = screenSize === 'mobile' || screenSize === 'tablet';
  const finalCardColor = cardColor || (isDarkMode ? colors.primary : colors.neutral);
  const finalTextColor = textColor || (isDarkMode ? colors.background : colors.secondary);

  // Store initial rotation on first render
  useEffect(() => {
    if (isFirstRender.current && groupRef.current) {
      initialRotation.current = groupRef.current.rotation.y;
      isFirstRender.current = false;
    }
  }, []);

  // Handle rotation requests from navigation context
  useEffect(() => {
    if (currentCard && groupRef.current && isRotating) {
      console.log(`Carousel: Received request to rotate to ${currentCard}`);
      
      // Find index of requested card
      const targetIndex = cardItems.findIndex(
        item => item.toLowerCase() === currentCard.toLowerCase()
      );
      
      if (targetIndex !== -1) {
        // Special solution for About/Contact inversion
        let targetAngle;
        
        // Explicitly invert About and Contact positions
        if (cardItems[targetIndex] === 'About') {
          // Use angle for Contact (2/4 * 2π)
          targetAngle = Math.PI + (2 / cardItems.length) * Math.PI * 2;
        } else if (cardItems[targetIndex] === 'Contact') {
          // Use angle for About (0/4 * 2π)
          targetAngle = Math.PI + (0 / cardItems.length) * Math.PI * 2;
        } else {
          // Calculate normally for other cards
          targetAngle = Math.PI + (targetIndex / cardItems.length) * Math.PI * 2;
        }
        
        const currentAngle = groupRef.current.rotation.y % (Math.PI * 2);
        let angleDiff = targetAngle - currentAngle;
        
        // Normalize angle difference between -π and π for shortest path
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        
        targetRotationY.current = groupRef.current.rotation.y + angleDiff;
      }
    }
  }, [currentCard, isRotating]);

  // Animation frame handler for rotation, card detection and camera zoom
  useFrame((_, delta) => {
    if (!groupRef.current) return;
  
    // Handle rotation animation
    if (targetRotationY.current !== null) {
      // Targeted rotation is always allowed, even if auto-rotation is disabled
      const newRotation = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY.current,
        0.05
      );
      
      groupRef.current.rotation.y = newRotation;
      
      // Stop animation when close enough to target
      if (Math.abs(groupRef.current.rotation.y - targetRotationY.current) < 0.01) {
        groupRef.current.rotation.y = targetRotationY.current;
        targetRotationY.current = null;
      }
    } else if (isAutoRotationEnabled) {
      // Auto-rotation only if enabled in context
      groupRef.current.rotation.y += delta * rotationSpeed;
    }

    // Detect which card is currently facing the user
    const normalizedAngle = groupRef.current.rotation.y % (Math.PI * 2);
    const angleOffset = normalizedAngle > 0 ? normalizedAngle : normalizedAngle + Math.PI * 2;
    const cardIndex = Math.round(((angleOffset - Math.PI) / (Math.PI * 2)) * cardItems.length) % cardItems.length;
    const actualIndex = (cardIndex + cardItems.length) % cardItems.length;
    
    // Update active card in state and context if changed
    if (actualIndex !== activeCardIndex) {
      setActiveCardIndex(actualIndex);
      
      // Only update context if not currently rotating to a target
      if (targetRotationY.current === null) {
        setCurrentCard(cardItems[actualIndex]);
      }
    }
    
    // Camera zoom management
    if (defaultZ.current === 5 && camera.position.z !== 5) {
      defaultZ.current = camera.position.z;
    }
    
    // Smooth zoom transition when hovering !
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z, 
      isHovering ? defaultZ.current * zoomFactor : defaultZ.current, 
      zoomSpeed
    );
  });
  
  return (
    <group 
      ref={groupRef}
      onPointerOver={() => {
        setIsHovering(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setIsHovering(false);
        document.body.style.cursor = 'default';
      }}
    >
      {cardItems.map((title, i) => {
        // Calculate position on the circle
        const angle = (i / cardItems.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Adjust card rotation based on device orientation
        const cardRotation: [number, number, number] = isMobileOrTablet
          ? [Math.PI/2, 0, Math.PI/2] // Portrait mode
          : [0, Math.PI/2, 0];        // Landscape mode
        
        return (
          <group 
            key={i}
            position={[x, 0, z]} 
            rotation={[0, Math.PI + angle, 0]}
          >
            <group rotation={cardRotation}>
              <CardTest 
                color={finalCardColor} 
              />
            </group>
            <group 
              position={[0, 0.1, 0]} 
              rotation={[0, Math.PI, 0]}
            >
              <Text
                position={[0, 0, 0.010]}
                fontSize={0.2}
                color={finalTextColor}
                anchorX="center"
                anchorY="middle"
              >
                {title}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
};