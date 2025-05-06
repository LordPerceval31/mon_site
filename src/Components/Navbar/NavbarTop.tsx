import React from "react";
import DiceSixFaces from "../DiceSixFaces";
import logoImage from "../../assets/logo.webp";
import DarkModeThemeToggle from "../Button/DarkModThemeToggle";
import { useResponsiveSize } from "../../hooks/useResponsiveSize";
import useTheme from "../../hooks/useTheme";
import { Canvas } from "@react-three/fiber";
import DynamicMouseLight from "../DynamiqueMouseLight";
import DynamicButton3D from "../DynamiqueButton3D";
import Button3DNavigate from "../Button/Button3DNavigate";

interface NavbarTopConfig {
  containerPadding: string;
  diceSizeContainer: string;
  diceSize: string;
  logoSizeContainer: string;
  logoSize: string;
  homeContainer: string;
  homeSize: string;
}

const NavbarTop: React.FC = () => {
  const { colors, isDarkMode } = useTheme();
  const screenSize = useResponsiveSize();

  const cardColor = isDarkMode ? colors.secondary : colors.secondary;
  const textColor = isDarkMode ? colors.primary : colors.primary;

  const getNavbarTopConfig = (): NavbarTopConfig => {
    switch (screenSize) {
      case "mobile":
        return {
          containerPadding: "px-4",
          diceSizeContainer: "w-20 h-20",
          diceSize: "w-16 h-16",
          logoSizeContainer: "w-20 h-20",
          logoSize: "w-12 h-16",
          homeContainer: "w-20 h-20",
          homeSize: "w-12 h-16",
        };
      case "tablet":
        return {
          containerPadding: "px-8",
          diceSizeContainer: "w-24 h-24",
          diceSize: "w-20 h-20",
          logoSizeContainer: "w-24 h-24",
          logoSize: "w-14 h-18",
          homeContainer: "w-20 h-20",
          homeSize: "w-12 h-16",
        };
      case "laptop":
        return {
          containerPadding: "px-8",
          diceSizeContainer: "w-28 h-28",
          diceSize: "w-24 h-24",
          logoSizeContainer: "w-28 h-28",
          logoSize: "w-16 h-20",
          homeContainer: "w-20 h-20",
          homeSize: "w-12 h-16",
        };
      case "desktop":
        return {
          containerPadding: "px-8",
          diceSizeContainer: "w-32 h-32",
          diceSize: "w-28 h-28",
          logoSizeContainer: "w-32 h-32",
          logoSize: "w-20 h-24",
          homeContainer: "w-20 h-20",
          homeSize: "w-12 h-16",
        };
      case "2K":
        return {
          containerPadding: "px-16",
          diceSizeContainer: "w-36 h-36",
          diceSize: "w-32 h-32",
          logoSizeContainer: "w-36 h-36",
          logoSize: "w-24 h-28",
          homeContainer: "w-20 h-20",
          homeSize: "w-12 h-16",
        };
      case "ultrawide":
        return {
          containerPadding: "px-16",
          diceSizeContainer: "w-40 h-40",
          diceSize: "w-36 h-36",
          logoSizeContainer: "w-40 h-40",
          logoSize: "w-28 h-32",
          homeContainer: "w-20 h-20",
          homeSize: "w-12 h-16",
        };
      case "4k":
        return {
          containerPadding: "px-16",
          diceSizeContainer: "w-44 h-44",
          diceSize: "w-40 h-40",
          logoSizeContainer: "w-44 h-44",
          logoSize: "w-32 h-36",
          homeContainer: "w-20 h-20",
          homeSize: "w-12 h-16",
        };
      default:
        return {
          containerPadding: "px-16",
          diceSizeContainer: "w-28 h-28",
          diceSize: "w-24 h-24",
          logoSizeContainer: "w-28 h-28",
          logoSize: "w-18 h-22",
          homeContainer: "w-20 h-20",
          homeSize: "w-12 h-16",
        };
    }
  };

  const config = getNavbarTopConfig();

  return (
    <nav
      className="w-full transition-colors duration-300 fixed top-0 z-50"
      data-cy="navbar-top"
    >
      <div className={`mx-auto ${config.containerPadding}`}>
        <div className={`flex justify-between items-center`}>
          {/* Home component */}
          <div
            className={`${config.homeContainer} flex items-center justify-center`}
          >
            <Canvas>
              <DynamicMouseLight intensity={1.5} influenceRadius={200} />
              <DynamicButton3D
                baseRotation={[Math.PI / 2, 0, 0]}
                influenceRadius={150}
                resetRadius={300}
                rotationIntensity={{ x: 1.5, y: 1.5, z: 1.2 }}
                autoRotateSpeed={0.002}
                resetSpeed={0.08}
              >
                <Button3DNavigate
                  type="home"
                  color={cardColor}
                  textColor={textColor}
                  onClick={() => console.log("back to home")}
                />
              </DynamicButton3D>
            </Canvas>
          </div>
          {/* Logo */}
          <div
            className={`${config.logoSizeContainer} flex items-center justify-center`}
          >
            <img
              src={logoImage}
              alt="Application logo"
              className={config.logoSize}
            />
          </div>
          {/* DarkModeThemeToggle component */}
          <div
            className={`${config.diceSizeContainer} flex items-center justify-center`}
          >
            <DarkModeThemeToggle />
          </div>
          {/* DiceSixFaces component */}
          <div
            className={`${config.diceSizeContainer} flex items-center justify-center`}
          >
            <div className={config.diceSize}>
              <DiceSixFaces />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTop;
