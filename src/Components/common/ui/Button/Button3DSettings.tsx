import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import { useRef, useState } from 'react'
import buttonSettingsGLB from '../../../../assets/buttonSettings.glb'

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

interface Button3DSettingsProps extends GroupProps {
  onClick?: () => void;
}

const Button3DSettings = ({ onClick, ...props }: Button3DSettingsProps) => {
  const { nodes, materials } = useGLTF(buttonSettingsGLB) as ButtonGLTF;
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerOver = () => {
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
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
        position={[-0.907, 0.038, 0.112]}
        scale={0.544}
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

useGLTF.preload(buttonSettingsGLB)

export default Button3DSettings