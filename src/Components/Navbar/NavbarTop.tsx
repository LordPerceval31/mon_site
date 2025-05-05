import React from "react";
import DiceSixFaces from "../DiceSixFaces";
import logoImage from "../../../../assets/logo.webp";
import DarkModeThemeToggle from "../Button/DarkModThemeToggle";
import { useResponsiveSize } from "../../hooks/useResponsiveSize";

interface NavbarTopConfig {
  containerPadding: string;
  diceSizeContainer: string;
  diceSize: string;
  logoSizeContainer: string;
  logoSize: string;
}

const NavbarTop: React.FC = () => {
  const screenSize = useResponsiveSize();

  const getNavbarTopConfig = (): NavbarTopConfig => {
    switch (screenSize) {
      case "mobile":
        return {
          containerPadding: "px-4",
          diceSizeContainer: "w-20 h-20",
          diceSize: "w-16 h-16",
          logoSizeContainer: "w-20 h-20",
          logoSize: "w-12 h-16",
        };
        case "tablette":
          return {
            containerPadding: "px-8",
            diceSizeContainer: "w-24 h-24",
            diceSize: "w-20 h-20",
            logoSizeContainer: "w-24 h-24",
            logoSize: "w-14 h-18",
          };
        case "laptop":
          return {
            containerPadding: "px-8",
            diceSizeContainer: "w-28 h-28",
            diceSize: "w-24 h-24",
            logoSizeContainer: "w-28 h-28",
            logoSize: "w-16 h-20",
          };
      case "desktop":
        return {
          containerPadding: "px-8",
          diceSizeContainer: "w-32 h-32",
          diceSize: "w-28 h-28",
          logoSizeContainer: "w-32 h-32",
          logoSize: "w-20 h-24",
        };
      case "2K":
        return {
          containerPadding: "px-16",
          diceSizeContainer: "w-36 h-36",
          diceSize: "w-32 h-32",
          logoSizeContainer: "w-36 h-36",
          logoSize: "w-24 h-28",
        };
      case "ultrawide":
        return {
          containerPadding: "px-16",
          diceSizeContainer: "w-40 h-40",
          diceSize: "w-36 h-36",
          logoSizeContainer: "w-40 h-40",
          logoSize: "w-28 h-32",
        };
      case "4k":
        return {
          containerPadding: "px-16",
          diceSizeContainer: "w-44 h-44",
          diceSize: "w-40 h-40",
          logoSizeContainer: "w-44 h-44",
          logoSize: "w-32 h-36",
        };
      default:
        return {
          containerPadding: "px-16",
          diceSizeContainer: "w-28 h-28",
          diceSize: "w-24 h-24",
          logoSizeContainer: "w-28 h-28",
          logoSize: "w-18 h-22",
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
          {/* DiceSixFaces component */}
          <div className={`${config.diceSizeContainer} flex items-center justify-center`}>
            <div className={config.diceSize}>
              <DiceSixFaces />
            </div>
          </div>

          {/* Logo */}
          <div className={`${config.logoSizeContainer} flex items-center justify-center`}>
            <img
              src={logoImage}
              alt="Application logo"
              className={config.logoSize}
            />
          </div>

          {/* DarkModeThemeToggle component */}
          <div className={`${config.diceSizeContainer} flex items-center justify-center`}>
            <DarkModeThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTop;