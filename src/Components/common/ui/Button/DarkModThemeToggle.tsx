import { useTheme } from '../../../../hooks/useTheme';


interface ThemeContextType {
  isDarkMode: boolean;
  toggleMode: () => void;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    neutral: string;
  };
}

const DarkModeThemeToggle = () => {
  const { isDarkMode, toggleMode, colors } = useTheme() as ThemeContextType;
  
  // Determine appropriate colors based on current theme
  const buttonBgColor = isDarkMode ? colors.primary : colors.neutral;
  const sunIconColor = isDarkMode ? colors.primary : colors.secondary;
  const moonIconColor = isDarkMode ? colors.primary : colors.neutral;
  const togglerBgColor = isDarkMode ? colors.background : colors.primary;
  const togglerPosition = isDarkMode ? 'translate-x-8' : 'translate-x-0';
  
  return (
    <button
      onClick={toggleMode}
      style={{ backgroundColor: buttonBgColor }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
      data-cy="theme-toggle"
    >
      {/* Container for static icons */}
      <div className="absolute w-full flex justify-between px-1.5 z-10">
        {/* Sun icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 z-20 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-0' : 'opacity-100'
          }`}
          viewBox="0 0 20 20" 
          fill={sunIconColor}
          aria-hidden="true"
        >
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>
        
        {/* Moon icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 z-20 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-0' : 'opacity-100'
          }`}
          viewBox="0 0 20 20" 
          fill={moonIconColor}
          aria-hidden="true"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
      
      {/* Moving toggle indicator */}
      <div 
        className={`h-6 w-6 rounded-full transition-transform duration-300 absolute left-1 ${togglerPosition}`}
        style={{ backgroundColor: togglerBgColor }}
        data-state={isDarkMode ? "dark" : "light"}
        aria-hidden="true"
      />
    </button>
  );
};

export default DarkModeThemeToggle;