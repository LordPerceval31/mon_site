

import { ScreenSize, useResponsiveSize } from "../hooks/useResponsiveSize";
import useTheme from "../hooks/useTheme";


interface LightingConfig {
  directionalIntensity: number;
  ambientIntensity: number;
  hemisphereIntensity: number;
  directionalPosition: [number, number, number];
}

const SceneLighting = () => {
  const screenSize: ScreenSize = useResponsiveSize();
  const { isDarkMode } = useTheme();

  const getLightingConfig = (): LightingConfig => {
    // Base configuration
    const config: LightingConfig = {
      directionalIntensity: 2,
      ambientIntensity: 1,
      hemisphereIntensity: 1,
      directionalPosition: [0, 5, 5]
    };

    // Adjust for dark mode
    if (isDarkMode) {
      config.directionalIntensity *= 0.8;
      config.ambientIntensity *= 0.7;
      config.hemisphereIntensity *= 0.8;
    }

    // Adjust for screen size
    switch (screenSize) {
      case 'mobile':
        config.directionalIntensity *= 0.8;
        config.directionalPosition = [0, 4, 4];
        break;
      case 'tablette':
        config.directionalIntensity *= 0.9;
        config.directionalPosition = [0, 4.5, 4.5];
        break;
      case '4k':
      case 'ultrawide':
        config.directionalIntensity *= 1.2;
        config.ambientIntensity *= 1.1;
        config.directionalPosition = [0, 6, 6];
        break;
    }

    return config;
  };

  const config = getLightingConfig();

  return (
    <>
      <directionalLight 
        position={config.directionalPosition} 
        intensity={config.directionalIntensity}
        castShadow
      />
      <ambientLight intensity={config.ambientIntensity} />
      <hemisphereLight 
        color="#ffffff"
        groundColor="#b9d5ff" 
        intensity={config.hemisphereIntensity} 
      />
    </>
  );
};

export default SceneLighting;