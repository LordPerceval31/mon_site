import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect, useRef } from 'react';

// Types de cartes disponibles (correspondant exactement aux titres dans le carousel)
export type CarouselCardType = 'About' | 'Projects' | 'Contact' | 'Settings';

interface NavigationContextType {
  currentCard: CarouselCardType | null;
  setCurrentCard: (card: CarouselCardType | null) => void;
  rotateToCard: (cardName: CarouselCardType) => void;
  isRotating: boolean;
  isAutoRotationEnabled: boolean;
  toggleAutoRotation: () => void;
  pauseRotationWithTimer: () => void;
}

// Valeur par défaut du contexte
const NavigationContext = createContext<NavigationContextType>({
  currentCard: null,
  setCurrentCard: () => {},
  rotateToCard: () => {},
  isRotating: false,
  isAutoRotationEnabled: true,
  toggleAutoRotation: () => {},
  pauseRotationWithTimer: () => {}
});

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentCard, setCurrentCard] = useState<CarouselCardType | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isAutoRotationEnabled, setIsAutoRotationEnabled] = useState<boolean>(true);
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Nettoyer le timer quand le composant est démonté
  useEffect(() => {
    return () => {
      if (rotationTimerRef.current) {
        clearTimeout(rotationTimerRef.current);
      }
    };
  }, []);

  // Fonction améliorée pour déclencher la rotation vers une carte
  const rotateToCard = useCallback((cardName: CarouselCardType) => {
    console.log(`Navigation context: Rotating to ${cardName}`);
    setIsRotating(true);
    setCurrentCard(cardName);
    
    // Remettre isRotating à false après une courte période
    // Cela permet au carousel de savoir quand la rotation a été "consommée"
    setTimeout(() => {
      setIsRotating(false);
    }, 50);
  }, []);

  const toggleAutoRotation = useCallback(() => {
    setIsAutoRotationEnabled(prev => !prev);
  }, []);

  // Nouvelle fonction pour mettre en pause la rotation avec un timer
  const pauseRotationWithTimer = useCallback(() => {
    // Arrêter d'abord la rotation
    setIsAutoRotationEnabled(false);
    
    // Nettoyer un timer existant si présent
    if (rotationTimerRef.current) {
      clearTimeout(rotationTimerRef.current);
    }
    
    // Définir un nouveau timer pour réactiver la rotation après 10 secondes
    rotationTimerRef.current = setTimeout(() => {
      console.log('Navigation context: Re-enabling rotation after timeout');
      setIsAutoRotationEnabled(true);
    }, 10000); // 10 secondes
  }, []);

  return (
    <NavigationContext.Provider value={{ 
      currentCard, 
      setCurrentCard, 
      rotateToCard,
      isRotating,
      isAutoRotationEnabled,
      toggleAutoRotation,
      pauseRotationWithTimer
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useNavigation = () => useContext(NavigationContext);