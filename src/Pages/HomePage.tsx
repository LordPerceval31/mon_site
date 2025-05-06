import { useTheme } from "../hooks/useTheme";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../Components/Loader";
import NavbarTop from "../Components/Navbar/NavbarTop";
import { Carousel } from "../Components/Carousel";
import NavbarBottom from "../Components/Navbar/NavbarBottom";
import { CarouselController } from "../Components/CarrouselController";


const HomePage = () => {
  const { isDarkMode, colors } = useTheme();

  return (
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
  camera={{ near: 0.1, far: 1000, fov: 75 }}
>
  <Suspense fallback={<Loader />}>
    <directionalLight position={[0, 5, 5]} intensity={2} />
    <ambientLight intensity={1} />
    <hemisphereLight groundColor="#b9d5ff" intensity={1} />
    
    {/* Utilisation du composant unifié */}
    <CarouselController 
      pages={4} 
      infinite={true}
      cameraDistance={3.5}
      mouseSensitivity={2}
    >
      <Carousel radius={2} />
    </CarouselController>
  </Suspense>
</Canvas>


      <NavbarBottom />
    </section>
  );
};

export default HomePage;
