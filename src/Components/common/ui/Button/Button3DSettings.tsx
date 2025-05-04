
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'
import buttonSettingsGLB from '../../../../assets/buttonSettings.glb'


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

interface Button3DSettingsProps extends GroupProps {}


const  Button3DSettings = (props: Button3DSettingsProps) => {
  const { nodes, materials } = useGLTF(buttonSettingsGLB) as GLTFResult
  
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