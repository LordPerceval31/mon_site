import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DynamicMouseLightProps } from "../types/dynamicComponentsInterfaces";

/**
 * Dynamic directional light that follows mouse movement
 * Creates interactive lighting effects that respond to cursor position
 */
const DynamicMouseLight: React.FC<DynamicMouseLightProps> = ({
  intensity = 1,
  influenceRadius = 300,
}) => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  // Track mouse movement and calculate light influence
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get canvas dimensions and position
      const canvas = gl.domElement;
      const rect = canvas.getBoundingClientRect();

      // Calculate canvas center coordinates
      const canvasCenterX = rect.left + rect.width / 2;
      const canvasCenterY = rect.top + rect.height / 2;

      // Calculate mouse position relative to canvas center
      const relativeX = event.clientX - canvasCenterX;
      const relativeY = event.clientY - canvasCenterY;

      // Calculate distance from mouse to center
      const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);

      // Calculate influence factor (1 at center, 0 beyond influenceRadius)
      const influence = Math.max(0, 1 - distance / influenceRadius);

      // Store normalized mouse position with applied influence
      mousePosition.current.x = (relativeX / rect.width) * 2 * influence;
      mousePosition.current.y = -(relativeY / rect.height) * 2 * influence;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gl.domElement, influenceRadius]);

  // Update light position and intensity each frame
  useFrame(() => {
    if (lightRef.current) {
      // Scale mouse movement to 3D world space
      const targetX = mousePosition.current.x * 5;
      const targetY = mousePosition.current.y * 5;

      // Apply smooth transition to light position
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        targetX,
        0.1
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        targetY,
        0.1
      );

      // Dynamically adjust Z position based on mouse proximity
      const targetZ =
        5 - Math.abs(mousePosition.current.x + mousePosition.current.y) * 0.5;
      lightRef.current.position.z = THREE.MathUtils.lerp(
        lightRef.current.position.z,
        targetZ,
        0.1
      );

      // Modulate light intensity based on mouse movement
      const distanceIntensity =
        intensity *
        (0.7 +
          0.3 *
            Math.max(
              Math.abs(mousePosition.current.x),
              Math.abs(mousePosition.current.y)
            ));
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        distanceIntensity,
        0.1
      );
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      position={[0, 0, 5]}
      intensity={intensity}
      castShadow
    />
  );
};

export default DynamicMouseLight;