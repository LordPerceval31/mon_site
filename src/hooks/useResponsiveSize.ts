import { useEffect, useState } from 'react';

type ScreenSize = 'mobile' | 'tablet' | 'laptop' | 'desktop' | '2K' | 'ultrawide' | '4k';

/**
 * Custom hook that detects and returns the current screen size category
 * Automatically updates when the window is resized
 */
export const useResponsiveSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>('laptop'); 

  useEffect(() => {
    // Update screen size category based on current window width
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Map window width to screen size categories
      if (width < 420) {
        setScreenSize('mobile');
      } else if (width < 768) {
        setScreenSize('tablet');
      } else if (width < 1366) {
        setScreenSize('laptop');
      } else if (width < 1920) {
        setScreenSize('desktop');
      } else if (width < 2560) {
        setScreenSize('2K');
      } else if (width < 3440) {
        setScreenSize('ultrawide');
      } else {
        setScreenSize('4k');
      }
    };

    // Initialize on mount
    handleResize();
    
    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export type { ScreenSize };