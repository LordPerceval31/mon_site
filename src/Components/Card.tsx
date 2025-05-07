import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useRef, useEffect } from "react";
import cardGLB from '../assets/card.glb'

/**
 * Type definition for the 3D card model structure
 */
interface CardInterfaceProps extends GLTF {
    nodes: {
        Cube: THREE.Mesh
    }
    materials: {
        'Material.001': THREE.MeshBasicMaterial
    }
}

/**
 * Props interface for the Card component
 */
interface CardProps extends GroupProps {
    color?: THREE.ColorRepresentation;
}

/**
 * 3D Card component that renders a customizable card model
 * with interactive cursor behavior
 */
const Card = ({ color = 'blue', ...props }: CardProps) => {
    const { nodes, materials } = useGLTF(cardGLB) as CardInterfaceProps;
    const groupRef = useRef<THREE.Group>(null);
    
    // Update material color when the color prop changes
    useEffect(() => {
        if (materials['Material.001']) {
            materials['Material.001'].color = new THREE.Color(color);
        }
    }, [materials, color]);

    // Event handlers for interactive cursor feedback
    const handlePointerOver = () => {
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        document.body.style.cursor = 'default';
    };

    return (
        <group
            ref={groupRef}
            {...props}
            dispose={null}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials['Material.001']}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[0.005, 1, 0.8]}
            />
        </group>
    )
}

// Preload the card model for better performance
useGLTF.preload(cardGLB)

export default Card