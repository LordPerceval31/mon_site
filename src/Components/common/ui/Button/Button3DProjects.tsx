
import { useGLTF } from '@react-three/drei'
import buttonprojectsGLB from '../../../../assets/buttonProjects.glb'
import type { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

// Define types for the GLB Button3DProjects structure
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

// Component props interface
interface Button3DProjectsProps extends GroupProps {
}

const Button3DProjects = (props: Button3DProjectsProps) => {
  const { nodes, materials } = useGLTF(buttonprojectsGLB) as GLTFResult
  
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

useGLTF.preload(buttonprojectsGLB)

export default Button3DProjects