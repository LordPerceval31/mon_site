import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps, useThree } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useRef, useEffect } from "react";
import cardTestGLB from '../assets/cardTest.glb'

interface CardProps extends GLTF {
    nodes: {
        Cube: THREE.Mesh
    }
    materials: {
        'Material.001': THREE.MeshBasicMaterial
    }

}

interface CardTestProps extends GroupProps {
    color?: THREE.ColorRepresentation;
}

const CardTest = ({ color = 'blue', ...props }: CardTestProps) => {
    const { nodes, materials } = useGLTF(cardTestGLB) as CardProps;
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useThree();

    useEffect(() => {
        if (materials['Material.001']) {
            materials['Material.001'].color = new THREE.Color(color);
        }
    }, [materials, color]);

    const handlePointerOver = () => {
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        document.body.style.cursor = 'default';
    };

     useEffect(() => {
        // This is just an example of how to add the card to the scene.
        // You might already have this logic in your main scene setup.
        if (groupRef.current) {
           // scene.add(groupRef.current);
        }

        //Cleanup
        return () => {
            if (groupRef.current) {
               // scene.remove(groupRef.current);
            }
        };
    }, [scene]);

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

useGLTF.preload(cardTestGLB)

export default CardTest