import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import buttonHomeGLB from '../../../../assets/buttonHome.glb'

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

interface Button3DHomeProps extends GroupProps {

}

const Button3DHome = (props: Button3DHomeProps) => {
  const { nodes, materials } = useGLTF(buttonHomeGLB) as ButtonGLTF
  
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

useGLTF.preload(buttonHomeGLB)

export default Button3DHome