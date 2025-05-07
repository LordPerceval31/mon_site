import { Theme, ThemeColors } from "../types/themeInterfaces";

export type ThemeMode = 'light' | 'dark';

/**
 * Supported color blindness adaptation types
 */
export type ColorBlindnessType = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia';

/**
 * Theme color definitions with accessibility variations
 * Organized by color blindness type and theme mode
 */
export const themeColors: Theme = {
  // Standard color palette
  normal: {
    light: {
      primary: "#FFFCF2",
      secondary: "#EB5E28",
      accent: "#CCC5B9",
      neutral: "#252422",
      background: "#F5F5F5",
      text: "#121212",
      textTwo: "#F5F5F5",
    },
    dark: {
      primary: "#F7EED4",
      secondary: "#EB5E28",
      accent: "#CCC5B9",
      neutral: "#F7EED4",
      background: "#252422",
      text: "#F5F5F5",
      textTwo: "#121212",
    }
  },
  // Deuteranopia (red-green color blindness) adaptation
  deuteranopia: {
    light: {
      primary: "#FFFCF2",
      secondary: "#D92B04",
      accent: "#A8A29E",
      neutral: "#252422",
      background: "#F5F5F5",
      text: "#121212",
      textTwo: "#F5F5F5",
    },
    dark: {
      primary: "#FFFCF2",
      secondary: "#FF6B35",
      accent: "#B8B2A7",
      neutral: "#FFFCF2",
      background: "#252422",
      text: "#F5F5F5",
      textTwo: "#121212",
    }
  },
  // Protanopia (red-green color blindness) adaptation
  protanopia: {
    light: {
      primary: "#FFFCF2",
      secondary: "#0088CC",
      accent: "#B5B5B5",
      neutral: "#252422",
      background: "#F5F5F5",
      text: "#121212",
      textTwo: "#F5F5F5",
    },
    dark: {
      primary: "#FFFCF2", 
      secondary: "#2CB3FF",
      accent: "#BEBEBE",
      neutral: "#FFFCF2",
      background: "#252422",
      text: "#F5F5F5",
      textTwo: "#121212",
    }
  },
  // Tritanopia (blue-yellow color blindness) adaptation
  tritanopia: {
    light: {
      primary: "#FFFCF2",
      secondary: "#C64600",
      accent: "#BDBDBD",
      neutral: "#252422",
      background: "#F5F5F5",
      text: "#121212",
      textTwo: "#F5F5F5",
    },
    dark: {
      primary: "#FFFCF2",
      secondary: "#FF7847",
      accent: "#D6D6D6",
      neutral: "#FFFCF2",
      background: "#252422",
      text: "#F5F5F5",
      textTwo: "#121212",
    }
  }
};

/**
 * Get theme colors based on color blindness type and theme mode
 * @param colorBlindness - Type of color blindness adaptation
 * @param mode - Light or dark theme mode
 * @returns Theme color object with all color values
 */
export const getThemeColors = (
  colorBlindness: ColorBlindnessType = 'normal',
  mode: ThemeMode = 'light'
): ThemeColors => {
  return themeColors[colorBlindness][mode];
};