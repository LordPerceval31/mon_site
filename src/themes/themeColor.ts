import { Theme, ThemeColors } from "../types/themeInterfaces";

export type ThemeMode = 'light' | 'dark';
export type ColorBlindnessType = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia';


export const themeColors: Theme = {
  // Normal vision
  normal: {
    light: {
      primary: "#FFFCF2",
      secondary: "#EB5E28",
      accent: "#CCC5B9",
      neutral: "#252422",
      background: "#FFFCF2",
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
  // Deuteranopia - difficulty with green colors
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
  // Protanopia - difficulty with red colors
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
  // Tritanopia - difficulty with blue colors
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

// Function to get theme colors
export const getThemeColors = (
  colorBlindness: ColorBlindnessType = 'normal',
  mode: ThemeMode = 'light'
): ThemeColors => {
  return themeColors[colorBlindness][mode];
};