
export interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    background: string;
    text: string;

  }
  
  export interface Theme {
    light: ThemeColors;
    dark: ThemeColors;
  }
  
  export const themeA: Theme = {
    light: {
      primary: '#FFFCF2',
      secondary: '#EB5E28',
      accent: '#CCC5B9',
      neutral: '#252422',
      background: '#F5F5F5',
      text: '#121212',

    },
    dark: {
      primary: '#FFFCF2',
      secondary: '#EB5E28',
      accent: '#CCC5B9',
      neutral: '#FFFCF2',
      background: '#252422',
      text: '#F5F5F5',

    },
  };
  
  export const themeB: Theme = {
    light: {
      primary: '',
      secondary: '',
      accent: '',
      neutral: '',
      background: '',
      text: '',

    },
    dark: {
      primary: '',
      secondary: '',
      accent: '',
      neutral: '',
      background: '',
      text: '',

    },
  };
  
  export const themeC: Theme = {
    light: {
      primary: '',
      secondary: '',
      accent: '',
      neutral: '',
      background: '',
      text: '',

    },
    dark: {
      primary: '',
      secondary: '',
      accent: '',
      neutral: '',
      background: '',
      text: '',

    },
  };
  
  // Objet pour gérer tous vos thèmes
  export const allThemes = {
    themeA,
    themeB,
    themeC,
  };
  
  // Type pour pouvoir identifier facilement vos thèmes
  export type ThemeName = keyof typeof allThemes;