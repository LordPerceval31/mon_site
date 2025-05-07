// hooks/useResponsiveSize.ts
import { useEffect, useState } from 'react';

type ScreenSize = 'mobile' | 'tablet' | 'laptop' | 'desktop' | '2K' | 'ultrawide' | '4k' ;

export const useResponsiveSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>('laptop'); 

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 420) {
        setScreenSize('mobile');
      } else if (width < 768) {
        setScreenSize('tablet');
      } else if (width < 1366) {
        setScreenSize('laptop');
      } else if (width < 1920) {
        setScreenSize('desktop');
      }  else if (width < 2560) {
        setScreenSize('2K');
      }  else if (width < 3440) {
        setScreenSize('ultrawide');
      } else {
        setScreenSize('4k');
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export type { ScreenSize };