import React from "react";
import { useResponsiveSize } from "../../hooks/useResponsiveSize";
import { Canvas } from "@react-three/fiber";
import DynamicMouseLight from "../DynamiqueMouseLight";
import DynamicButton3D from "../DynamiqueButton3D";
import Button3DNavigate from "../Button/Button3DNavigate";
import useTheme from "../../hooks/useTheme";
import {
  CarouselCardType,
  useNavigation,
} from "../../contexts/NavigationContext";

interface NavbarBottomConfig {
  containerPadding: string;
  NavbarBottomContainer: string;
  ButtonContainer: string;
}

interface ButtonConfig {
  type: "about" | "projects" | "contact" | "settings";
  dataCy: string;
  label: CarouselCardType;
}

const NavbarBottom: React.FC = () => {
  const screenSize = useResponsiveSize();
  const config = getNavbarBottonConfig(screenSize);
  const { currentCard, rotateToCard } = useNavigation();
  const { colors, isDarkMode } = useTheme();

  // Couleurs pour les boutons normaux et actifs
  const cardColor = isDarkMode ? colors.secondary : colors.neutral;
  const textColor = isDarkMode ? colors.primary : colors.primary;

  // Couleurs pour le bouton actif
  const activeCardColor = isDarkMode ? colors.neutral : colors.secondary;
  const activeTextColor = isDarkMode ? colors.secondary : colors.primary;

  // Tableau de configuration pour les boutons
  const buttonConfigs: ButtonConfig[] = [
    {
      type: "about",
      dataCy: "about-button",
      label: "About",
    },
    {
      type: "projects",
      dataCy: "projects-button",
      label: "Projects",
    },
    {
      type: "contact",
      dataCy: "contact-button",
      label: "Contact",
    },
    {
      type: "settings",
      dataCy: "settings-button",
      label: "Settings",
    },
  ];

  // Fonction pour vérifier si un bouton est sélectionné
  const isButtonSelected = (buttonLabel: CarouselCardType): boolean => {
    if (currentCard === null) return false;
    return buttonLabel === currentCard;
  };

  // Fonction pour gérer le clic sur un bouton
  const handleButtonClick = (label: CarouselCardType) => {
    console.log(`NavbarBottom: Rotating to ${label}`);
    rotateToCard(label);
  };

  return (
    <nav
      className={`${config.NavbarBottomContainer} transition-colors duration-300 fixed bottom-0 left-1/2 transform -translate-x-1/2 z-5`}
      data-cy="navbar-bottom"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={`mx-auto ${config.containerPadding}`}>
        <div className={`flex justify-between items-center`}>
          {buttonConfigs.map((buttonConfig, index) => {
            const selected = isButtonSelected(buttonConfig.label);

            return (
              <div
                key={index}
                className={`${config.ButtonContainer} transform -translate-y-10 relative`}
                data-cy={buttonConfig.dataCy}
              >
                <Canvas>
                  <ambientLight intensity={0.1} />
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
                      color={selected ? activeCardColor : cardColor}
                      textColor={selected ? activeTextColor : textColor}
                      type={buttonConfig.type}
                      onClick={() => handleButtonClick(buttonConfig.label)}
                    />
                  </DynamicButton3D>
                </Canvas>
                <span className="sr-only">
                  {buttonConfig.label} {selected ? "(selected)" : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

const getNavbarBottonConfig = (screenSize: string): NavbarBottomConfig => {
  switch (screenSize) {
    case "mobile":
      return {
        containerPadding: "px-0",
        NavbarBottomContainer: "h-20 w-[24rem]",
        ButtonContainer: "w-20 h-20",
      };
    case "tablet":
      return {
        containerPadding: "px-0",
        NavbarBottomContainer: "h-20 w-[28rem]",
        ButtonContainer: "w-20 h-20",
      };
    case "laptop":
      return {
        containerPadding: "px-8",
        NavbarBottomContainer: "h-20 w-[40rem]",
        ButtonContainer: "w-20 h-20",
      };
    case "desktop":
      return {
        containerPadding: "px-8",
        NavbarBottomContainer: "h-20 w-[40rem]",
        ButtonContainer: "w-20 h-20",
      };
    case "2K":
      return {
        containerPadding: "px-8",
        NavbarBottomContainer: "h-20 w-[40rem]",
        ButtonContainer: "w-20 h-20",
      };
    case "ultrawide":
      return {
        containerPadding: "px-8",
        NavbarBottomContainer: "h-20 w-[40rem]",
        ButtonContainer: "w-20 h-20",
      };
    case "4k":
      return {
        containerPadding: "px-8",
        NavbarBottomContainer: "h-20 w-[40rem]",
        ButtonContainer: "w-20 h-20",
      };
    default:
      return {
        containerPadding: "px-8",
        NavbarBottomContainer: "h-20 w-[40rem]",
        ButtonContainer: "w-20 h-20",
      };
  }
};

export default NavbarBottom;
