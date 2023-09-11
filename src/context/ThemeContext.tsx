import {FC, createContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {
  getBooleanFromsaveToMMKVStorage,
  saveToMMKVStorage,
} from 'utils/MMKVStorage';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  //   setScheme: () => {},
  toggleDarkMode: () => {},
});

export interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: FC<Props> = ({children}) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme == 'dark');

  useEffect(() => {
    setIsDarkMode(getBooleanFromsaveToMMKVStorage('theme') ?? false);
  }, []);

  // useEffect(() => {
  //   setIsDarkMode(colorScheme == 'dark');
  // }, [colorScheme]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    saveToMMKVStorage('theme', !isDarkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
