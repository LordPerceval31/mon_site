// src/hooks/useTheme.ts
import { useTheme as useThemeContext } from "../contexts/themeContext";
import { ThemeColors, ThemeMode, ColorBlindnessType } from "../themes/theme";

// Interface pour le hook useTheme
interface UseThemeResult {
  // États actuels
  mode: ThemeMode;
  colorBlindnessType: ColorBlindnessType;
  colors: ThemeColors;
  isDarkMode: boolean;

  // Méthodes pour changer le thème
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setColorBlindnessType: (type: ColorBlindnessType) => void;

  // Méthode utilitaire pour obtenir la valeur d'une couleur spécifique
  getColor: (colorName: keyof ThemeColors) => string;
}

//Hook personnalisé pour accéder et manipuler le thème de l'application
export const useTheme = (): UseThemeResult => {
  const context = useThemeContext();

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
