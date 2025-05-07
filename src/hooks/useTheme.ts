import { useTheme as useThemeContext } from "../contexts/ThemeContext";
import { ThemeMode, ColorBlindnessType } from "../themes/themeColor";
import { ThemeColors } from "../types/themeInterfaces";

/**
 * Extended interface for the enhanced theme hook
 * Provides additional utility methods and computed properties
 */
interface UseThemeHookResult {
  // Current theme state
  mode: ThemeMode;
  colorBlindnessType: ColorBlindnessType;
  colors: ThemeColors;
  isDarkMode: boolean;

  // Theme control methods
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setColorBlindnessType: (type: ColorBlindnessType) => void;

  // Utility method for accessing specific colors
  getColor: (colorName: keyof ThemeColors) => string;
}

/**
 * Enhanced theme hook that extends the base context with additional functionality
 * Provides computed properties and utility methods for theme management
 */
export const useTheme = (): UseThemeHookResult => {
  const context = useThemeContext();

  // Computed property for dark mode detection
  const isDarkMode = context.mode === "dark";

  // Utility method to get a specific color value by name
  const getColor = (colorName: keyof ThemeColors): string => {
    return context.colors[colorName];
  };

  // Return extended context with additional properties and methods
  return {
    ...context,
    isDarkMode,
    getColor,
  };
};

export default useTheme;