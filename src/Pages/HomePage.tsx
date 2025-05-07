// src/pages/HomePage.tsx
import { useTheme } from "../hooks/useTheme";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../Components/Loader";
import NavbarTop from "../Components/Navbar/NavbarTop";
import { Carousel } from "../Components/Carousel";
import NavbarBottom from "../Components/Navbar/NavbarBottom";
import { NavigationProvider } from "../contexts/NavigationContext";

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
      >
        <NavbarTop />
        <Canvas
          className="h-screen w-full bg-transparent"
          camera={{ position: [0, 0, 5], near: 0.1, far: 1000, fov: 75 }}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight position={[0, 5, 5]} intensity={2} />
            <ambientLight intensity={1} />
            <hemisphereLight groundColor="#b9d5ff" intensity={1} />
            
            <Carousel radius={2} />
          </Suspense>
        </Canvas>
        <NavbarBottom />
      </section>
    </NavigationProvider>
  );
};

export default HomePage;