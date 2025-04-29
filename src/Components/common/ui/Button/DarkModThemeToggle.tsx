

import { useTheme } from '../../../../hooks/useTheme';

const DarkModThemeToggle = () => {
  const { isDarkMode, toggleMode, colors } = useTheme();
  
  return (
    <button
      onClick={toggleMode}
      className="relative w-16 h-8 rounded-full focus:outline-none transition-colors duration-300 flex items-center"
      style={{ 
        backgroundColor: isDarkMode ? colors.primary: colors.neutral
      }}
      aria-label={isDarkMode ? "lightMode" : "DarkMode"}
      data-cy="theme-toggle"

    >
      {/* Container for static icons */}
      <div className="absolute w-full flex justify-between px-1.5 z-10">
        {/* Sun icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 z-20" 
          viewBox="0 0 20 20" 
          fill={!isDarkMode ? colors.secondary : isDarkMode ? colors.primary : colors.secondary}

        >
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>
        
        {/* Moon icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 z-20" 
          viewBox="0 0 20 20" 
          fill={isDarkMode ? colors.primary : !isDarkMode ? colors.neutral : colors.primary}

        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
      
      {/* Moving circle */}
      <div 
        className="h-6 w-6 rounded-full transition-all duration-300 absolute"
        style={{ 
          backgroundColor: isDarkMode ? colors.background : colors.primary,
          left: isDarkMode ? 'calc(100% - 1.5rem - 2px)' : '2px' 
        }}

        data-state={isDarkMode ? "dark" : "light"}
      />
    </button>
  );
};

export default DarkModThemeToggle;