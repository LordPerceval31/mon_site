// Nous allons créer un nouveau fichier pour chaque type de carte
// AboutCard.tsx, ProjectsCard.tsx, ContactCard.tsx, SettingsCard.tsx

// Voici un exemple pour AboutCard.tsx que vous pourrez adapter pour les autres
import * as THREE from 'three';
import { useRef, useState, useContext } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { easing } from 'maath';
import { CarouselContext } from '../Carousel'; 
import Button3DAbout from '../../common/ui/Button/Button3DAbout';

// Définition du type pour les props du composant Card
type AboutCardProps = {
  position: [number, number, number];
  rotation: [number, number, number];
};

// Composant AboutCard spécifique
export function AboutCard({ position, rotation }: AboutCardProps) {
  // Référence au mesh pour manipuler ses propriétés
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
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
    if (groupRef.current) {
      // Animation de l'échelle lors du survol
      easing.damp3(
        groupRef.current.scale,
        hovered ? [1.15, 1.15, 1.15] : [1, 1, 1],
        0.1,
        delta
      );
    }
  });
  
  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <mesh ref={meshRef}>
        {/* Base de la carte */}
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial 
          color="#f5f5f5"
          roughness={0.5}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Le bouton 3D "About" au centre de la carte */}
      <Button3DAbout 
        position={[0, 0, 0.1]} 
        scale={0.3} 
      />
      
      {/* Texte ou élément supplémentaire */}
      <mesh position={[0, -0.8, 0.1]}>
        <planeGeometry args={[1.2, 0.3]} />
        <meshBasicMaterial color="#EB5E28" />
      </mesh>
    </group>
  );
}