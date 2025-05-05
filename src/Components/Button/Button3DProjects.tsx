import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import { useRef } from 'react'
import buttonProjectsGLB from '../../assets/buttonProjects.glb'

interface ButtonGLTF extends GLTF {
  nodes: {
    Circle: THREE.Mesh
    Text: THREE.Mesh
    Sphere: THREE.Mesh
  }
  materials: {
    'Material.001': THREE.Material
    'Material.002': THREE.Material
    'Material.003': THREE.Material
  }
}

interface Button3DProjectsProps extends GroupProps {
  onClick?: () => void;
}

const Button3DProjects = ({ onClick, ...props }: Button3DProjectsProps) => {
  const { nodes, materials } = useGLTF(buttonProjectsGLB) as ButtonGLTF;
  const groupRef = useRef<THREE.Group>(null);

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <group 
      ref={groupRef}
      {...props} 
      dispose={null}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials['Material.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials['Material.003']}
        position={[-0.921, 0.038, 0.12]}
        scale={0.549}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials['Material.002']}
        scale={[1, 0.5, 1]}
      />
    </group>
  )
}

useGLTF.preload(buttonProjectsGLB)

export default Button3DProjects