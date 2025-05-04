import NavbarTop from "../Components/common/ui/navBar/NavBarTop";
import { useTheme } from "../hooks/useTheme";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../Components/Loader";
import NavbarBottom from "../Components/common/ui/navBar/NavbarBottom";

const HomePage = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <section
      className="h-screen w-full transition-colors duration-300"
      style={{
        backgroundColor: isDarkMode ? colors.background : colors.background,
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
        </Suspense>
      </Canvas>

      <NavbarBottom />
    </section>
  );
};

export default HomePage;
