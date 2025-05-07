import { Html } from "@react-three/drei";

/**
 * Loading spinner component for Three.js scenes
 * Renders a centered animated spinner using HTML within 3D space
 */
const Loader = () => {
  return (
    <Html>
      <div className="flex justify-center items-center">
        <div 
          className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin"
          role="status" 
          aria-label="Loading"
        ></div>
      </div>
    </Html>
  );
};

export default Loader;