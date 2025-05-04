import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import buttonAboutGLB from '../../../../assets/buttonAbout.glb'

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

interface Button3DAboutProps extends GroupProps {
  // Add any additional props here if needed
}

const Button3DAbout = (props: Button3DAboutProps) => {
  const { nodes, materials } = useGLTF(buttonAboutGLB) as ButtonGLTF
  
  return (
    <group {...props} dispose={null}>
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
        position={[-0.748, 0.032, 0.127]}
        scale={0.601}
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

// Preload the model for better performance
useGLTF.preload(buttonAboutGLB)

export default Button3DAbout