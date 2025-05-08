import { Theme, ThemeColors } from "../types/themeInterfaces";

// src/themes/theme.ts
export type ThemeMode = 'light' | 'dark';
export type ColorBlindnessType = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia';

// Utilisation du thème existant depuis le fichier importé
export const themeColors: Theme = {
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

// Fonction pour obtenir les couleurs du thème
export const getThemeColors = (
  colorBlindness: ColorBlindnessType = 'normal',
  mode: ThemeMode = 'light'
): ThemeColors => {
  return themeColors[colorBlindness][mode];
};