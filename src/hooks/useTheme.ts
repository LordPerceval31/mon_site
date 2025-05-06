import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';
import { ThemeColors, UseThemeHookResult } from '../types/themeInterfaces';

// Utilisation de l'interface UseThemeHookResult définie
export const useTheme = (): UseThemeHookResult => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  // Ajouter un calcul pour savoir si c'est le mode sombre
  const isDarkMode = context.mode === "dark";

  // Ajouter une fonction utilitaire pour obtenir une couleur spécifique
  const getColor = (colorName: keyof ThemeColors): string => {
    return context.colors[colorName];
  };

  return {
    ...context,
    isDarkMode,
    getColor,
  };
};

export default useTheme;