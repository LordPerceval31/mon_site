import React from "react";
import { useResponsiveSize } from "../../hooks/useResponsiveSize";
import { Canvas } from "@react-three/fiber";
import DynamicMouseLight from "../DynamiqueMouseLight";
import DynamicButton3D from "../DynamiqueButton3D";
import Button3DNavigate from "../Button/Button3DNavigate";
import useTheme from "../../hooks/useTheme";
import { CarouselCardType, useNavigation } from "../../contexts/NavigationContext";

// Configuration interface for responsive navbar layout
interface NavbarBottomConfig {
  containerPadding: string;
  NavbarBottomContainer: string;
  ButtonContainer: string;
}

// Configuration interface for navigation buttons
interface ButtonConfig {
  type: "about" | "projects" | "contact" | "settings";
  dataCy: string;
  label: CarouselCardType;
}

/**
 * Navigation bar component displayed at the bottom of the screen
 * with 3D interactive buttons for main application sections
 */
const NavbarBottom: React.FC = () => {
  const screenSize = useResponsiveSize();
  const config = getNavbarBottonConfig(screenSize);
  const { 
    currentCard, 
    rotateToCard, 
    isAutoRotationEnabled, 
    pauseRotationWithTimer 
  } = useNavigation();
  const { colors, isDarkMode } = useTheme();
  
  // Button configuration array for consistent rendering
  const buttonConfigs: ButtonConfig[] = [
    {
      type: "about",
      dataCy: "about-button",
      label: "About"
    },
    {
      type: "projects",
      dataCy: "projects-button",
      label: "Projects"
    },
    {
      type: "contact",
      dataCy: "contact-button",
      label: "Contact"
    },
    {
      type: "settings",
      dataCy: "settings-button",
      label: "Settings"
    },
  ];

  // Check if a button is currently selected
  const isButtonSelected = (buttonLabel: CarouselCardType): boolean => {
    return buttonLabel === currentCard;
  };

  // Dynamic color calculation based on theme and button state
  const cardColor = isDarkMode ? colors.secondary : colors.neutral;
  const textColor = isDarkMode ? colors.primary : colors.primary;
  const activeCardColor = isDarkMode ? colors.neutral : colors.secondary;
  const activeTextColor = isDarkMode ? colors.secondary : colors.primary;

  // Handle button click event with rotation control
  const handleButtonClick = (label: CarouselCardType) => {
    console.log(`NavbarBottom: Clicking on ${label}`);
    
    pauseRotationWithTimer();
    
    if (!isButtonSelected(label)) {
      console.log(`NavbarBottom: Rotating to ${label}`);
      rotateToCard(label);
    }
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
                {/* Screen reader text for accessibility */}
                <span className="sr-only">
                  {buttonConfig.label} {selected ? '(selected)' : ''}
                  {selected && !isAutoRotationEnabled ? ' (rotation en pause)' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

/**
 * Get responsive configuration based on screen size
 * Adjusts container dimensions and padding for different devices
 */
const getNavbarBottonConfig = (screenSize: string): NavbarBottomConfig => {
  switch (screenSize) {
    case "mobile":
      return {
        containerPadding: "px-0",
        NavbarBottomContainer: "h-20 w-[20rem]",
        ButtonContainer: "w-16 h-16",
      };
    case "tablet":
      return {
        containerPadding: "px-0",
        NavbarBottomContainer: "h-20 w-[32rem]",
        ButtonContainer: "w-20 h-20",
      };
    // Desktop and larger screen configurations have identical values
    case "laptop":
    case "desktop":
    case "2K":
    case "ultrawide":
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