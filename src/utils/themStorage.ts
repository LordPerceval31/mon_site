// src/utils/themeStorage.ts
import { ThemeMode, ColorBlindnessType } from '../themes/theme';

export const THEME_MODE_KEY = 'themeMode';
export const COLOR_BLINDNESS_TYPE_KEY = 'colorBlindnessType';

/**
 * Sauvegarde le mode de thème dans le localStorage
 */
export const saveThemeMode = (mode: ThemeMode): void => {
  try {
    localStorage.setItem(THEME_MODE_KEY, mode);
  } catch (error) {
    console.error('Failed to save theme mode to localStorage:', error);
  }
};

/**
 * Récupère le mode de thème depuis le localStorage
 */
export const getThemeMode = (): ThemeMode | null => {
  try {
    const mode = localStorage.getItem(THEME_MODE_KEY) as ThemeMode;
    if (mode && (mode === 'light' || mode === 'dark')) {
      return mode;
    }
    return null;
  } catch (error) {
    console.error('Failed to get theme mode from localStorage:', error);
    return null;
  }
};

/**
 * Sauvegarde le type de daltonisme dans le localStorage
 */
export const saveColorBlindnessType = (type: ColorBlindnessType): void => {
  try {
    localStorage.setItem(COLOR_BLINDNESS_TYPE_KEY, type);
  } catch (error) {
    console.error('Failed to save color blindness type to localStorage:', error);
  }
};

/**
 * Récupère le type de daltonisme depuis le localStorage
 */
export const getColorBlindnessType = (): ColorBlindnessType | null => {
  try {
    const type = localStorage.getItem(COLOR_BLINDNESS_TYPE_KEY) as ColorBlindnessType;
    if (type && ['normal', 'deuteranopia', 'protanopia', 'tritanopia'].includes(type)) {
      return type;
    }
    return null;
  } catch (error) {
    console.error('Failed to get color blindness type from localStorage:', error);
    return null;
  }
};

/**
 * Détecte la préférence de thème du système
 */
export const getSystemThemePreference = (): ThemeMode => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

/**
 * Écoute les changements de préférence de thème du système
 */
export const listenToSystemThemeChanges = (callback: (mode: ThemeMode) => void): () => void => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    const newMode: ThemeMode = e.matches ? 'dark' : 'light';
    callback(newMode);
  };
  
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  } else {
    // Pour la compatibilité avec les anciens navigateurs
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }
};