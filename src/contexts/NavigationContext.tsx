import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect, useRef } from 'react';

/**
 * Available card types in the carousel navigation
 * Must match exactly the titles displayed in the carousel
 */
export type CarouselCardType = 'About' | 'Projects' | 'Contact' | 'Settings';

/**
 * Navigation context interface defining all available methods and state
 */
interface NavigationContextType {
  currentCard: CarouselCardType | null;
  setCurrentCard: (card: CarouselCardType | null) => void;
  rotateToCard: (cardName: CarouselCardType) => void;
  isRotating: boolean;
  isAutoRotationEnabled: boolean;
  toggleAutoRotation: () => void;
  pauseRotationWithTimer: () => void;
}

// Default context values
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

/**
 * Navigation provider component that manages carousel state and rotation
 * Provides methods for controlling automatic rotation and card selection
 */
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentCard, setCurrentCard] = useState<CarouselCardType | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isAutoRotationEnabled, setIsAutoRotationEnabled] = useState<boolean>(true);
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup rotation timer on component unmount
  useEffect(() => {
    return () => {
      if (rotationTimerRef.current) {
        clearTimeout(rotationTimerRef.current);
      }
    };
  }, []);

  // Trigger rotation to a specific card
  const rotateToCard = useCallback((cardName: CarouselCardType) => {
    console.log(`Navigation context: Rotating to ${cardName}`);
    setIsRotating(true);
    setCurrentCard(cardName);
    
    // Reset rotation flag after a short delay
    // This allows the carousel to know when rotation request is complete
    setTimeout(() => {
      setIsRotating(false);
    }, 50);
  }, []);

  // Toggle automatic rotation on/off
  const toggleAutoRotation = useCallback(() => {
    setIsAutoRotationEnabled(prev => !prev);
  }, []);

  // Temporarily pause rotation with automatic resume after delay
  const pauseRotationWithTimer = useCallback(() => {
    // Stop rotation immediately
    setIsAutoRotationEnabled(false);
    
    // Clear any existing timer
    if (rotationTimerRef.current) {
      clearTimeout(rotationTimerRef.current);
    }
    
    // Set new timer to re-enable rotation after delay
    rotationTimerRef.current = setTimeout(() => {
      console.log('Navigation context: Re-enabling rotation after timeout');
      setIsAutoRotationEnabled(true);
    }, 10000); // 10 seconds pause
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

/**
 * Custom hook for accessing the navigation context
 * Provides carousel control methods and state
 */
export const useNavigation = () => useContext(NavigationContext);