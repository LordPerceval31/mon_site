
// Types de thème (modes et types de daltonisme)
export type ThemeMode = 'light' | 'dark';
export type ColorBlindnessType = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia';

// Structure des couleurs du thème
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
  text: string;
  textTwo: string;
}

// Structure du thème complet
export interface Theme {
  [key: string]: {
    [key in ThemeMode]: ThemeColors;
  };
}

// Interface pour le contexte de thème
export interface ThemeContextProps {
  mode: ThemeMode;
  colorBlindnessType: ColorBlindnessType;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  setColorBlindnessType: (type: ColorBlindnessType) => void;
  toggleMode: () => void;
}

// Interface étendue pour le hook useTheme
export interface UseThemeHookResult extends ThemeContextProps {
  isDarkMode: boolean;
  getColor: (colorName: keyof ThemeColors) => string;
}