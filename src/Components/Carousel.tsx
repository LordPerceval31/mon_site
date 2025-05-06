import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import useTheme from '../hooks/useTheme';
import { useResponsiveSize } from '../hooks/useResponsiveSize';
import CardTest from './Card';

// Type pour les props du Carousel
type CarouselProps = {
  radius?: number;
  cardColor?: string; 
  textColor?: string;
};

// Définition des cartes avec les titres uniquement
const cardItems = ['About', 'Projects', 'Contact', 'Settings'];

// Composant Carousel simplifié
export const Carousel = ({
  radius = 2,
  cardColor, 
  textColor,
}: CarouselProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);
  const { colors, isDarkMode } = useTheme();
  const screenSize = useResponsiveSize();
  
  // Détermine si nous sommes sur mobile ou tablette
  const isMobileOrTablet = screenSize === 'mobile' || screenSize === 'tablet';
  
  // Utilise les couleurs par défaut du thème si aucune n'est spécifiée
  const defaultCardColor = isDarkMode ? colors.primary : colors.neutral;
  const defaultTextColor = isDarkMode ? colors.background : colors.secondary;
  
  // Couleurs finales à utiliser
  const finalCardColor = cardColor || defaultCardColor;
  const finalTextColor = textColor || defaultTextColor;
  
  // Arrête la rotation quand une carte est survolée
  useFrame((_, delta) => {
    if (groupRef.current && !isAnyCardHovered) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });
  
  return (
    <group ref={groupRef}>
      {cardItems.map((title, i) => {
        // Position sur le cercle
        const angle = (i / cardItems.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Rotation pour la carte selon l'orientation de l'écran
        const cardRotation: [number, number, number] = isMobileOrTablet
          ? [Math.PI/2, 0, Math.PI/2] // Mode portrait
          : [0, Math.PI/2, 0];        // Mode paysage
        
        // Position du texte
        const textPosition: [number, number, number] = [0, 0, 0.010];
        
        return (
          <group 
            key={i}
            position={[x, 0, z]} 
            rotation={[0, Math.PI + angle, 0]}
            onPointerOver={() => setIsAnyCardHovered(true)}
            onPointerOut={() => setIsAnyCardHovered(false)}
          >
            <group rotation={cardRotation}>
              <CardTest color={finalCardColor} />
            </group>
            <group 
              position={[0, 0.1, 0]} 
              rotation={[0, Math.PI, 0]}
            >
              <Text
                position={textPosition}
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