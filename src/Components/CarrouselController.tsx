// src/Components/CarouselController.tsx
import * as THREE from 'three';
import { ReactNode, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';
import { easing } from 'maath';

// Types pour les props des composants
type CarouselControllerProps = {
  children?: ReactNode;
  pages?: number;
  distance?: number;
  damping?: number;
  infinite?: boolean;
  cameraDistance?: number;
  initialRotation?: [number, number, number];
  mouseSensitivity?: number;
};

// Composant principal qui encapsule les fonctionnalités de Rig et ScrollView
export const CarouselController = ({
  children,
  pages = 3,
  distance = 1,
  damping = 0.3,
  infinite = true,
  cameraDistance = 3.5,
  initialRotation = [0, 0, 0.15],
  mouseSensitivity = 2,
}: CarouselControllerProps) => {
  return (
    <ScrollControls pages={pages} infinite={infinite} damping={damping} distance={distance}>
      <RotatingGroup 
        rotation={initialRotation} 
        cameraDistance={cameraDistance} 
        mouseSensitivity={mouseSensitivity}
      >
        {children}
      </RotatingGroup>
    </ScrollControls>
  );
};

// Props pour le composant de groupe en rotation
type RotatingGroupProps = {
  children?: ReactNode;
  rotation?: [number, number, number];
  cameraDistance?: number;
  mouseSensitivity?: number;
};

// Composant interne qui gère la rotation et l'animation de la caméra
const RotatingGroup = ({
  children,
  rotation = [0, 0, 0.15],
  cameraDistance = 3.5,
  mouseSensitivity = 2,
}: RotatingGroupProps) => {
  // Référence au groupe
  const groupRef = useRef<THREE.Group>(null);
  
  // Hook pour accéder aux données de défilement
  const scroll = useScroll();
  
  // Animation à chaque frame
  useFrame((state, delta) => {
    // Mise à jour des événements
    (state.events as { update: () => void }).update();
    
    if (groupRef.current) {
      // Normalisation de l'offset pour un scroll infini dans les deux sens
      const normalizedOffset = ((scroll.offset % 1) + 1) % 1;
      // Rotation basée sur le défilement normalisé
      groupRef.current.rotation.y = -normalizedOffset * (Math.PI * 2);
    }
    
    // Animation de la caméra en fonction de la position de la souris
    if (state.camera && state.pointer) {
      easing.damp3(
        state.camera.position,
        [
          -state.pointer.x * mouseSensitivity,  // Déplacement horizontal basé sur la souris
          state.pointer.y* 1.5,                // Déplacement vertical réduit (0.5 au lieu de 1.5)
          cameraDistance                        // Distance de la caméra
        ],
        0.3,                                    // Facteur d'amortissement
        delta                                   // Delta time
      );
      
      // Faire regarder la caméra vers le centre de la scène
      state.camera.lookAt(0, 0, 0);
    }
  });
  
  // Retourne un groupe qui contient les éléments enfants
  return (
    <group ref={groupRef} rotation={rotation}>
      {children}
    </group>
  );
};