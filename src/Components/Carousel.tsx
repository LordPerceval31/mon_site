import * as THREE from 'three';
import { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import useTheme from '../hooks/useTheme';
import { useResponsiveSize } from '../hooks/useResponsiveSize';
import CardTest from './Card';

// Type pour les props du Carousel
type CarouselProps = {
  radius?: number;
};

// Contexte pour gérer l'état de survol
export const CarouselContext = createContext<{
  setHovered: (isHovered: boolean) => void;
}>({
  setHovered: () => {},
});

// Définition des 4 cartes
const cardTypes = [
  { title: 'About', colorKey: 'neutral' },
  { title: 'Projects', colorKey: 'neutral' },
  { title: 'Contact', colorKey: 'neutral' },
  { title: 'Settings', colorKey: 'neutral' }
];

// Composant Carousel
export function Carousel({ radius = 2 }: CarouselProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);
  const { colors, isDarkMode } = useTheme();
  const screenSize = useResponsiveSize();
  
  // Déterminer si nous sommes sur mobile ou tablette
  const isMobileOrTablet = screenSize === 'mobile' || screenSize === 'tablette';
  
  // Arrête la rotation quand une carte est survolée
  useFrame((_, delta) => {
    if (groupRef.current && !isAnyCardHovered) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });
  
  // Déterminer la couleur du texte en fonction du thème
  const textColor = isDarkMode ? colors.background : colors.secondary;
  
  return (
    <CarouselContext.Provider value={{ setHovered: setIsAnyCardHovered }}>
      <group ref={groupRef}>
        {cardTypes.map((card, i) => {
          // Position sur le cercle
          const angle = (i / cardTypes.length) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          // Obtenir la couleur du thème pour les cartes
          const cardColor = colors[card.colorKey as keyof typeof colors];
          
          // Rotation pour la carte
          const cardRotation: [number, number, number] = isMobileOrTablet
            ? [ Math.PI/2, 0, Math.PI/2] // Rotation pour mode portrait
            : [0, Math.PI/2, 0];        // Rotation pour mode paysage
          
          // Position du texte ajustée selon l'orientation
          const textPosition: [number, number, number] = isMobileOrTablet
            ? [0, 0, 0.010] // Position pour mode portrait
            : [0, 0, 0.010]; // Position pour mode paysage
          
          return (
            <group 
              key={i}
              position={[x, 0, z]} 
              rotation={[0, Math.PI + angle, 0]}
              onPointerOver={() => setIsAnyCardHovered(true)}
              onPointerOut={() => setIsAnyCardHovered(false)}
            >
              <group rotation={cardRotation}>
                <CardTest color={cardColor} />
              </group>
              <group 
                position={[0, 0.1, 0]} 
                rotation={[0, Math.PI, 0]}
              >
                <Text
                  position={textPosition}
                  fontSize={0.2}
                  color={textColor}
                  anchorX="center"
                  anchorY="middle"
                >
                  {card.title}
                </Text>
              </group>
            </group>
          );
        })}
      </group>
    </CarouselContext.Provider>
  );
}