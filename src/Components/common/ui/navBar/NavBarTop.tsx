import React from 'react';
import useTheme from '../../../../hooks/useTheme';
import DarkModThemeToggle from '../Button/DarkModThemeToggle';

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
      <div className="flex justify-end">
        <DarkModThemeToggle />
      </div>
    </nav>
  );
};

export default NavBarTop;