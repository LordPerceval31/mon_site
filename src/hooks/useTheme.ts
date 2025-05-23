
import { ColorBlindnessType, ThemeColors, ThemeMode } from "../types/themeInterfaces";
import { useTheme as useThemeContext } from "../contexts/themeContext";

// Renommer cette interface pour éviter toute confusion
interface UseThemeHookResult {
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

// Ce hook étend les fonctionnalités du hook de base du context
export const useTheme = (): UseThemeHookResult => {
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