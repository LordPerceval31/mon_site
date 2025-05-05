import * as THREE from 'three';
import { useRef, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { easing } from 'maath';

// Type pour les props du composant Rig
type RigProps = {
  children: ReactNode;
  rotation?: [number, number, number];
};

// Composant Rig qui contrôle les mouvements de la caméra et la rotation du groupe
export function Rig({ children, rotation = [0, 0, 0.15] }: RigProps) {
  // Référence au groupe
  const groupRef = useRef<THREE.Group>(null);
  
  // Hook pour accéder aux données de défilement
  const scroll = useScroll();
  
  // Animation à chaque frame
  useFrame((state, delta) => {
    // Récupération de la position de la souris
    const { pointer } = state;
    
    // Mise à jour des événements - utiliser l'opérateur de chaînage optionnel
    (state.events as { update: () => void }).update();
    
    // Rotation basée sur le défilement (ajout du pattern ScrollView)
    if (groupRef.current) {
      // Normalisation de l'offset pour garantir un scroll infini dans les deux sens
      const normalizedOffset = ((scroll.offset % 1) + 1) % 1;
      // Rotation basée sur le défilement normalisé
      groupRef.current.rotation.y = -normalizedOffset * (Math.PI * 2);
    }
    
    // Mouvement fluide de la caméra en fonction de la position de la souris
    if (state.camera && pointer) {
      easing.damp3(
        state.camera.position,
        [
          -pointer.x * 2,  // Déplacement horizontal basé sur la position X de la souris
          pointer.y * 0.5, // Déplacement vertical basé sur la position Y de la souris
          3.5            // Distance fixe de la caméra
        ],
        0.3,               // Facteur d'amortissement pour un mouvement fluide
        delta              // Delta time pour une animation indépendante du framerate
      );
    }
    
    // Faire regarder la caméra vers le centre de la scène
    if (state.camera) {
      state.camera.lookAt(0, 0, 0);
    }
  });
  
  // Retourne un groupe qui contiendra les éléments enfants (le Carousel dans notre cas)
  return (
    <group ref={groupRef} rotation={rotation}>
      {children}
    </group>
  );
}