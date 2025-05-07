

//Theme mode options and accessibility adaptations

export type ThemeMode = 'light' | 'dark';
export type ColorBlindnessType = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia';

// Core theme color structure
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
  text: string;
  textTwo: string;
}

// Complete theme organization by color blindness type and mode
export interface Theme {
  [key: string]: {
    [key in ThemeMode]: ThemeColors;
  };
}
// Theme context interface
export interface ThemeContextProps {
  mode: ThemeMode;
  colorBlindnessType: ColorBlindnessType;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  setColorBlindnessType: (type: ColorBlindnessType) => void;
  toggleMode: () => void;
}

//Extended theme hook interface with additional utilities
export interface UseThemeHookResult extends ThemeContextProps {
  isDarkMode: boolean;
  getColor: (colorName: keyof ThemeColors) => string;
}