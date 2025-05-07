import { useTheme } from "../hooks/useTheme";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../Components/Loader";
import NavbarTop from "../Components/Navbar/NavbarTop";
import { Carousel } from "../Components/Carousel";
import NavbarBottom from "../Components/Navbar/NavbarBottom";
import { NavigationProvider } from "../contexts/NavigationContext";

/**
 * Main home page component that displays the 3D carousel interface
 * Provides theme-aware styling and navigation context
 */
const HomePage = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <NavigationProvider>
      <section
        className="h-screen w-full transition-colors duration-300"
        style={{
          backgroundColor: isDarkMode ? colors.background : colors.primary,
        }}
        data-cy="home-section"
        role="main"
        aria-label="Home page with 3D interactive carousel"
      >
        {/* Top navigation bar with logo and theme controls */}
        <NavbarTop />
        
        {/* 3D canvas for the interactive carousel */}
        <Canvas
          className="h-screen w-full bg-transparent"
          camera={{ position: [0, 0, 5], near: 0.1, far: 1000, fov: 75 }}
        >
          {/* Loading indicator while 3D content is being prepared */}
          <Suspense fallback={<Loader />}>
            {/* Scene lighting setup */}
            <directionalLight position={[0, 5, 5]} intensity={2} />
            <ambientLight intensity={1} />
            <hemisphereLight groundColor="#b9d5ff" intensity={1} />
            
            {/* Main interactive carousel with cards */}
            <Carousel radius={2} />
          </Suspense>
        </Canvas>
        
        {/* Bottom navigation bar with 3D navigation buttons */}
        <NavbarBottom />
      </section>
    </NavigationProvider>
  );
};

export default HomePage;