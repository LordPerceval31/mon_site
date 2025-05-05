import React from "react";
import { useResponsiveSize } from "../../../../hooks/useResponsiveSize";
import { Canvas } from "@react-three/fiber";
import { GroupProps } from "@react-three/fiber";
import Button3DAbout from "../Button/Button3DAbout";
import Button3DHome from "../Button/Button3DHome";
import Button3DProjects from "../Button/Button3DProjects";
import Button3DContact from "../Button/Button3DContact";
import Button3DSettings from "../Button/Button3DSettings";
import DynamicMouseLight from "../../../DynamiqueMouseLight";
import DynamicButton3D from "../../../DynamiqueButton3D";

interface NavbarBottomConfig {
  containerPadding: string;
  NavbarBottomContainer: string;
  ButtonContainer: string;
}

interface Button3DProps extends GroupProps {
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  onClick?: () => void;
}

interface ButtonConfig {
  component: React.FC<Button3DProps>;
  dataCy: string;
  label: string;
  ariaLabel: string;
}

const buttonConfigs: ButtonConfig[] = [
  {
    component: Button3DHome,
    dataCy: "home-button",
    label: "Home",
    ariaLabel: "Navigate to home page",
  },
  {
    component: Button3DAbout,
    dataCy: "about-button",
    label: "About",
    ariaLabel: "Navigate to about page",
  },
  {
    component: Button3DProjects,
    dataCy: "projects-button",
    label: "Projects",
    ariaLabel: "Navigate to projects page",
  },
  {
    component: Button3DContact,
    dataCy: "contact-button",
    label: "Contact",
    ariaLabel: "Navigate to contact page",
  },
  {
    component: Button3DSettings,
    dataCy: "settings-button",
    label: "Settings",
    ariaLabel: "Open settings menu",
  },
];

const NavbarBottom: React.FC = () => {
  const screenSize = useResponsiveSize();

  const getNavbarBottonConfig = (): NavbarBottomConfig => {
    switch (screenSize) {
      case "mobile":
        return {
          containerPadding: "px-0",
          NavbarBottomContainer: "h-20 w-[20rem]",
          ButtonContainer: "w-16 h-16",
        };
      case "tablette":
        return {
          containerPadding: "px-0",
          NavbarBottomContainer: "h-20 w-[32rem]",
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

  const config = getNavbarBottonConfig();

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
            const ButtonComponent = buttonConfig.component;

            return (
              <div
                key={index}
                className={`${config.ButtonContainer} transform -translate-y-10 relative`}
                data-cy={buttonConfig.dataCy}
              >
                {/* 3D Canvas - Visual Layer */}
                <Canvas 
                >
                  <ambientLight intensity={0.5} />
                  <DynamicMouseLight 
                    intensity={1.5} 
                    influenceRadius={200} 
                  />
                  
                  <DynamicButton3D
                    baseRotation={[Math.PI / 2, 0, 0]}
                    influenceRadius={150}  
                    resetRadius={300}   
                    rotationIntensity={{ x: 1.5, y: 1.5, z: 1.2 }}
                    autoRotate={true}
                    autoRotateSpeed={0.002}
                    resetSpeed={0.08}
                  >
                    <ButtonComponent
                      onClick={() => console.log(`Clicked ${buttonConfig.label}`)}
                    />
                  </DynamicButton3D>
                </Canvas>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavbarBottom;