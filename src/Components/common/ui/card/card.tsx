import * as THREE from 'three';
import { useRef, useState, useContext } from 'react'; // Ajout de useContext
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { easing } from 'maath';
import { CarouselContext } from '../Carousel'; // Import du contexte

// Définition du type pour les props du composant Card
type CardProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  color?: string;
};

// Composant Card - remplace les Images avec BentPlaneGeometry
export function Card({ position, rotation, color = '#ff8080' }: CardProps) {
  // Référence au mesh pour manipuler ses propriétés
  const meshRef = useRef<THREE.Mesh>(null);
  
  // État pour suivre si la carte est survolée
  const [hovered, setHover] = useState(false);
  
  // Utiliser le contexte pour communiquer l'état de survol au parent
  const { setHovered } = useContext(CarouselContext);
  
  // Fonctions pour gérer les événements de souris
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHover(true);
    setHovered(true); // Informer le carousel qu'une carte est survolée
  };
  
  const handlePointerOut = () => {
    setHover(false);
    setHovered(false); // Informer le carousel qu'aucune carte n'est survolée
  };
  
  // Animation à chaque frame
  useFrame((_, delta) => {
    if (meshRef.current) {
      // Animation de l'échelle lors du survol
      easing.damp3(
        meshRef.current.scale,
        hovered ? [1.15, 1.15, 1.15] : [1, 1, 1],
        0.1,
        delta
      );
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Utilisez une BoxGeometry simple au lieu de BentPlaneGeometry */}
      <boxGeometry args={[1, 1.5, 0.1]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.5}
        metalness={0.1}
        side={THREE.DoubleSide} // Rendre les deux faces
      />
    </mesh>
  );
}