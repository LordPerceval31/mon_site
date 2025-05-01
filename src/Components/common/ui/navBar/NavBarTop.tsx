import React from "react";
import useTheme from "../../../../hooks/useTheme";
import DarkModThemeToggle from "../Button/DarkModThemeToggle";
import DiceSixFaces from "../../../3DModels/Objets/DiceSixFaces";
import logoImage from "../../../../assets/logo.webp";

const NavBarTop: React.FC = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <nav
      className="w-full transition-colors duration-300 py-4"
      style={{
        backgroundColor: isDarkMode ? colors.background : colors.primary,
        color: colors.text,
      }}
      data-cy="navbar-top"
    >
      <div className="flex justify-between items-center w-full px-4">
        <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          <DiceSixFaces />
        </div>

        <img
          src={logoImage}
          alt="Application logo"
          className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28"
        />

        <DarkModThemeToggle />
      </div>
    </nav>
  );
};

export default NavBarTop;
