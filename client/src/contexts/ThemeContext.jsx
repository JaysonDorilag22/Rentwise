import React, { createContext, useContext } from 'react';

// Theme Context - Light mode only with green theme
const ThemeContext = createContext();

// Theme Provider
export const ThemeProvider = ({ children }) => {
  const theme = {
    mode: 'light',
    colors: {
      primary: 'primary-500',
      secondary: 'secondary-500',
      background: 'background-50',
      surface: 'white',
      text: 'gray-900',
    }
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
