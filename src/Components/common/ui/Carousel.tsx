import * as THREE from 'three';
import { useRef, useState, createContext, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useResponsiveSize } from '../../../hooks/useResponsiveSize';
import { useTheme } from '../../../hooks/useTheme';

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
  const { colors } = useTheme();
  
  // Arrête la rotation quand une carte est survolée
  useFrame((_, delta) => {
    if (groupRef.current && !isAnyCardHovered) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });
  
  return (
    <CarouselContext.Provider value={{ setHovered: setIsAnyCardHovered }}>
      <group ref={groupRef}>
        {cardTypes.map((card, i) => {
          // Position sur le cercle
          const angle = (i / cardTypes.length) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          // Obtenir la couleur du thème pour cette carte
          const cardColor = colors[card.colorKey as keyof typeof colors];
          
          return (
            <SimpleCard
              key={i}
              position={[x, 0, z]}
              rotation={[0, Math.PI + angle, 0]}
              title={card.title}
              color={cardColor}
              setHovered={setIsAnyCardHovered}
            />
          );
        })}
      </group>
    </CarouselContext.Provider>
  );
}

// Type pour les props de la carte
type SimpleCardProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  color: string;
  setHovered: (isHovered: boolean) => void;
};

// Composant de carte simple
function SimpleCard({ position, rotation, title, setHovered }: SimpleCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const screenSize = useResponsiveSize();
  const [cardDimensions, setCardDimensions] = useState<[number, number, number]>([1.2, 1.8, 0.1]);
  const { isDarkMode, colors } = useTheme();
  
  // Ajuster les dimensions de la carte en fonction de la taille de l'écran
  useEffect(() => {
    if (screenSize === 'mobile' || screenSize === 'tablette') {
      setCardDimensions([1.2, 1.8, 0.1]);
    } else {
      setCardDimensions([1.8, 1.2, 0.1]);
    }
  }, [screenSize]);
  
  // Gestion du survol
  const handlePointerOver = () => {
    setHover(true);
    setHovered(true);
  };
  
  const handlePointerOut = () => {
    setHover(false);
    setHovered(false);
  };
  
  // Animation de l'échelle au survol
  useFrame((_, delta) => {
    if (meshRef.current) {
      const lerpFactor = Math.min(0.1 * (60 * delta), 1);
      
      meshRef.current.scale.lerp(
        new THREE.Vector3(
          hovered ? 1.15 : 1, 
          hovered ? 1.15 : 1, 
          hovered ? 1.15 : 1
        ), 
        lerpFactor
      );
    }
  });
  
  // Choisir la couleur du texte en fonction du thème
  const textColor = isDarkMode ? colors.primary : colors.secondary;
  const backgroundColor = new THREE.Color(isDarkMode ? colors.background: colors.primary);
  
  return (
    <group position={position} rotation={rotation}>
      <mesh 
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={cardDimensions} />
        <meshBasicMaterial color={backgroundColor} />
      </mesh>
      
      <Text
        position={[0, 0, -0.06]}
        fontSize={0.2}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
      >
        {title}
      </Text>
    </group>
  );
}