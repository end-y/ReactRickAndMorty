import { createContext, FC, useContext, useState } from 'react';
import { themes } from '../constants/constants';
import { Colors, Mode, ThemeContextType, ThemeProviderProps } from '../types/themes';

const contextDefaultValue: ThemeContextType = {
  colors: themes["light"],
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(contextDefaultValue);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider:FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<Mode>("light");

  const toggleTheme = () => {
    setDarkMode(prevMode => prevMode == "light" ? "dark" : "light");
  };
  const colors = themes[darkMode] as Colors
  const themeContextValue: ThemeContextType = {
    colors,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;