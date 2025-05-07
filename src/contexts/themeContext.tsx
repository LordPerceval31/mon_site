import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode, ColorBlindnessType, getThemeColors} from '../themes/themeColor';
import { ThemeColors, ThemeContextProps } from '../types/themeInterfaces';


const defaultContext: ThemeContextProps = {
  mode: 'light',
  colorBlindnessType: 'normal',
  colors: getThemeColors('normal', 'light'),
  setMode: () => {},
  setColorBlindnessType: () => {},
  toggleMode: () => {}
};

const ThemeContext = createContext<ThemeContextProps>(defaultContext);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component with accessibility features
 * Manages theme mode and color blindness adaptations
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme mode from localStorage or system preference
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode;
    }
    
    // Use system preference as fallback
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });
  
  // Initialize color blindness settings from localStorage
  const [colorBlindnessType, setColorBlindnessType] = useState<ColorBlindnessType>(() => {
    const savedType = localStorage.getItem('colorBlindnessType') as ColorBlindnessType;
    return (savedType && ['normal', 'deuteranopia', 'protanopia', 'tritanopia'].includes(savedType)) 
      ? savedType 
      : 'normal';
  });

  // Derived theme colors based on current settings
  const [colors, setColors] = useState<ThemeColors>(getThemeColors(colorBlindnessType, mode));

  // Update colors and apply theme to document when settings change
  useEffect(() => {
    setColors(getThemeColors(colorBlindnessType, mode));
    
    // Apply theme attributes to HTML root element
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.setAttribute('data-color-blindness', colorBlindnessType);
    
    // Save preferences to localStorage
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('colorBlindnessType', colorBlindnessType);
    
    // Apply CSS custom properties for theme colors
    Object.entries(getThemeColors(colorBlindnessType, mode)).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  }, [mode, colorBlindnessType]);

  // Toggle between light and dark modes
  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  // Construct context value with current state and methods
  const contextValue: ThemeContextProps = {
    mode,
    colorBlindnessType,
    colors,
    setMode,
    setColorBlindnessType,
    toggleMode
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access theme context
 * Provides theme state and control methods
 */
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Export as default for simpler imports
export default useTheme;