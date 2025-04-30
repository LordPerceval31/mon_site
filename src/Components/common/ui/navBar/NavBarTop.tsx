import React from 'react';
import useTheme from '../../../../hooks/useTheme';
import DarkModThemeToggle from '../Button/DarkModThemeToggle';
import DiceSixFaces from '../../../3DModels/Objets/DiceSixFaces';

const NavBarTop: React.FC = () => {
  const { colors, isDarkMode } = useTheme();
  
  return (
    <nav 
      className="w-full py-8 px-8 transition-colors duration-300"
      style={{ 
        backgroundColor: isDarkMode ? colors.background : colors.primary,
        color: colors.text
      }}
      data-cy="navbar-top" 
    >
      <div className="flex justify-between px-8 items-center w-full">
        <div className="flex items-center">
          <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
            <DiceSixFaces />
          </div>
        </div>
        <DarkModThemeToggle />
      </div>
    </nav>
  );
};

export default NavBarTop;