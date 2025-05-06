
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode, ColorBlindnessType, getThemeColors} from '../themes/theme';
import { ThemeColors } from '../types/themeInterfaces';

interface ThemeContextProps {
  mode: ThemeMode;
  colorBlindnessType: ColorBlindnessType;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  setColorBlindnessType: (type: ColorBlindnessType) => void;
  toggleMode: () => void;
}

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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Récupérer les préférences de l'utilisateur du localStorage ou utiliser les valeurs par défaut
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode;
    }
    
    // Vérifier les préférences du système
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });
  
  const [colorBlindnessType, setColorBlindnessType] = useState<ColorBlindnessType>(() => {
    const savedType = localStorage.getItem('colorBlindnessType') as ColorBlindnessType;
    return (savedType && ['normal', 'deuteranopia', 'protanopia', 'tritanopia'].includes(savedType)) 
      ? savedType 
      : 'normal';
  });

  // Dériver les couleurs actuelles à partir du mode et du type de daltonisme
  const [colors, setColors] = useState<ThemeColors>(getThemeColors(colorBlindnessType, mode));

  // Mettre à jour les couleurs lorsque le mode ou le type de daltonisme change
  useEffect(() => {
    setColors(getThemeColors(colorBlindnessType, mode));
    
    // Appliquer le thème à l'élément HTML racine
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.setAttribute('data-color-blindness', colorBlindnessType);
    
    // Enregistrer les préférences
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('colorBlindnessType', colorBlindnessType);
    
    // Appliquer les variables CSS personnalisées
    Object.entries(getThemeColors(colorBlindnessType, mode)).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  }, [mode, colorBlindnessType]);

  // Fonction pour basculer entre les modes clair et sombre
  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  // Créer la valeur du contexte
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

// Hook personnalisé pour utiliser le contexte de thème
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};