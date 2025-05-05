import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';
import { easing } from 'maath';
import { Carousel } from './Carousel'; // Ajustez le chemin d'importation selon votre structure

// Type pour les props du composant ScrollCarousel
type ScrollCarouselProps = {
  radius?: number;
  pages?: number;
  carouselRotation?: [number, number, number];
};

// Composant principal qui combine ScrollControls et Carousel
export function ScrollCarousel({ 
  radius = 3,
  pages = 3, 
  carouselRotation = [0, 0, 0.15] 
}: ScrollCarouselProps) {
  return (
    <ScrollControls pages={pages} infinite damping={0.3} distance={1}>
      <CarouselRig rotation={carouselRotation} radius={radius} />
    </ScrollControls>
  );
}

// Type pour les props du composant CarouselRig
type CarouselRigProps = {
  rotation?: [number, number, number];
  radius: number;
};

// Composant qui combine Rig et Carousel
function CarouselRig({ rotation = [0, 0, 0.15], radius }: CarouselRigProps) {
  // Référence au groupe
  const groupRef = useRef<THREE.Group>(null);
  // Hook pour accéder aux données de défilement
  const scroll = useScroll();
  
  // Animation à chaque frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Normalisation de l'offset pour garantir un scroll infini dans les deux sens
      const normalizedOffset = ((scroll.offset % 1) + 1) % 1;
      // Rotation basée sur le défilement normalisé
      groupRef.current.rotation.y = -normalizedOffset * (Math.PI * 2);
    }
    
    // Mise à jour des événements
    (state.events as { update: () => void }).update();
    
    // Mouvement fluide de la caméra en fonction de la position de la souris
    if (state.camera && state.pointer) {
      easing.damp3(
        state.camera.position,
        [
          -state.pointer.x * 2,    // Déplacement horizontal basé sur la position X de la souris
          state.pointer.y + 1.5,   // Déplacement vertical basé sur la position Y de la souris
          25                      // Distance de la caméra considérablement augmentée
        ],
        0.3,                     // Facteur d'amortissement pour un mouvement fluide
        delta                    // Delta time pour une animation indépendante du framerate
      );
    }
    
    // Faire regarder la caméra vers le centre de la scène
    if (state.camera) {
      state.camera.lookAt(0, 0, 0);
    }
  });
  
  // Retourne un groupe qui contient le carousel
  return (
    <group ref={groupRef} rotation={rotation}>
      <Carousel radius={radius} />
    </group>
  );
}