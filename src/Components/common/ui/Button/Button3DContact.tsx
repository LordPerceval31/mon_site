
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import buttonContactGLB from '../../../../assets/buttonContact.glb'
import { GroupProps } from '@react-three/fiber'


type GLTFResult = GLTF & {
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

interface Button3DContactProps extends GroupProps {}

const Button3DContact = (props: Button3DContactProps) => {
  const { nodes, materials } = useGLTF(buttonContactGLB) as GLTFResult
  
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
        position={[-0.919, 0.038, 0.127]}
        scale={0.574}
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

// Preload the Button3DContact
useGLTF.preload(buttonContactGLB)

export default Button3DContact