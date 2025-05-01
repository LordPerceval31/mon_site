import React from "react";
import DiceSixFaces from "../../../3DModels/Objets/DiceSixFaces";
import logoImage from "../../../../assets/logo.webp";
import DarkModeThemeToggle from "../Button/DarkModThemeToggle";

const NavBarTop: React.FC = () => {
  return (
    <nav
      className="w-full transition-colors duration-300 "
      data-cy="navbar-top"
    >
      <div className="flex justify-between ">
        {/* Premier élément - DiceSixFaces dans un conteneur de taille fixe */}
        <div className="w-32 h-32 flex items-center justify-center">
          <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
            <DiceSixFaces />
          </div>
        </div>

        {/* Deuxième élément - Logo dans un conteneur de taille fixe */}
        <div className="w-32 h-32 flex items-center justify-center">
          <img
            src={logoImage}
            alt="Application logo"
            className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28"
          />
        </div>

        {/* Troisième élément - DarkModeThemeToggle dans un conteneur de taille fixe */}
        <div className="w-32 h-32 flex items-center justify-center">
          <DarkModeThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBarTop;