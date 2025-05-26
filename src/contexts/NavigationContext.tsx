import React, { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from 'react';
import { useResponsiveSize } from '../hooks/useResponsiveSize';

// Types de cartes disponibles
export type CarouselCardType = 'About' | 'Projects' | 'Contact' | 'Settings' | null;

interface NavigationContextType {
  currentCard: CarouselCardType;
  isAutoRotationPaused: boolean;
  rotateToCard: (cardName: CarouselCardType) => void;
}

// Initialisation avec null (aucune carte sélectionnée)
const NavigationContext = createContext<NavigationContextType>({
  currentCard: null,
  isAutoRotationPaused: false,
  rotateToCard: () => {}
});

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  // Initialiser currentCard à null explicitement
  const [currentCard, setCurrentCard] = useState<CarouselCardType>(null);
  const [isAutoRotationPaused, setIsAutoRotationPaused] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const screenSize = useResponsiveSize();
  
  // Déterminer si nous sommes sur mobile ou tablette
  const isMobileOrTablet = screenSize === 'mobile' || screenSize === 'tablet';

  // Effet pour désactiver la rotation automatique sur mobile/tablette
  useEffect(() => {
    // Définir isAutoRotationPaused à true uniquement sur mobile/tablette
    setIsAutoRotationPaused(isMobileOrTablet);
  }, [isMobileOrTablet]);

  // Fonction pour gérer la rotation vers une carte
  const rotateToCard = useCallback((cardName: CarouselCardType) => {
    console.log(`Navigation context: Rotating to ${cardName}`);
    
    // Mettre à jour la carte actuelle
    setCurrentCard(cardName);
    
    // Sur desktop uniquement, appliquez la pause temporaire
    if (!isMobileOrTablet) {
      // Mettre en pause la rotation automatique
      setIsAutoRotationPaused(true);
      
      // Nettoyer un timer existant si présent
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
      
      // Définir un nouveau timer pour réactiver la rotation après 10 secondes
      pauseTimerRef.current = setTimeout(() => {
        setIsAutoRotationPaused(false);
        setCurrentCard(null);
      }, 10000);
    }
  }, [isMobileOrTablet]);

  // Nettoyer le timer lors du démontage du composant
  React.useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ 
      currentCard,
      isAutoRotationPaused, 
      rotateToCard
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useNavigation = () => useContext(NavigationContext);