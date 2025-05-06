
import { useResponsiveSize } from '../../../src/hooks/useResponsiveSize';
// Composant de test qui affiche simplement la valeur retournée par le hook
export const ResponsiveSizeTestComponent = () => {
    const screenSize = useResponsiveSize();
    
    // Retourne la valeur du hook dans un élément DOM avec un attribut data-testid
    return <div data-testid="screen-size">{screenSize}</div>;
  }
