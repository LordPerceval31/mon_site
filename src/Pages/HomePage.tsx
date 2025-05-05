import { useTheme } from "../hooks/useTheme";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../Components/Loader";
import { Carousel } from "../Components/common/ui/Carousel";
import { Rig } from "../Components/common/ui/rig";
import { ScrollControls } from "@react-three/drei";
import NavbarTop from "../Components/common/ui/Navbar/NavBarTop";
import NavbarBottom from "../Components/common/ui/Navbar/NavbarBottom";

const HomePage = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <section
      className="h-screen w-full transition-colors duration-300"
      style={{
        backgroundColor: isDarkMode ? colors.primary : colors.neutral,
        color: isDarkMode ? colors.primary : colors.neutral,
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
          <ScrollControls pages={4} infinite>
            <Rig rotation={[0, 0, 0.15]}>
              <Carousel radius={2} />
            </Rig>
          </ScrollControls>
        </Suspense>
      </Canvas>

      <NavbarBottom />
    </section>
  );
};

export default HomePage;
