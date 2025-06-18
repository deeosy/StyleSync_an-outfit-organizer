// store/themeStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define color themes with both light and dark variants
const colorThemes = {
  pink: {
    name: 'Rose',
    light: {
      primary: 'bg-pink-400',
      primaryHover: 'hover:bg-pink-500',
      secondary: 'bg-pink-400',
      secondaryHover: 'hover:bg-pink-400',
      light: 'bg-pink-100',
      border: 'border-gray-400',
      text: 'text-pink-600',
      ring: 'focus:ring-pink-300',
      gradient: 'from-pink-400 to-pink-400',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-gray-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500'
    },
    dark: {
      primary: 'bg-pink-500',
      primaryHover: 'hover:bg-pink-600',
      secondary: 'bg-pink-400',
      secondaryHover: 'hover:bg-pink-700',
      light: 'bg-pink-900/20',
      border: 'border-pink-500',
      text: 'text-pink-400',
      ring: 'focus:ring-pink-400',
      gradient: 'from-pink-500 to-pink-700',
      surface: 'bg-gray-800',
      surfaceHover: 'hover:bg-gray-700',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400'
    }
  },
  blue: {
    name: 'Ocean',
    light: {
      primary: 'bg-blue-400',
      primaryHover: 'hover:bg-blue-500',
      secondary: 'bg-blue-300',
      secondaryHover: 'hover:bg-blue-400',
      light: 'bg-blue-100',
      border: 'border-gray-400',
      text: 'text-blue-600',
      ring: 'focus:ring-blue-300',
      gradient: 'from-blue-400 to-blue-600',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-gray-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500'
    },
    dark: {
      primary: 'bg-blue-500',
      primaryHover: 'hover:bg-blue-600',
      secondary: 'bg-blue-600',
      secondaryHover: 'hover:bg-blue-700',
      light: 'bg-blue-900/20',
      border: 'border-blue-500',
      text: 'text-blue-400',
      ring: 'focus:ring-blue-400',
      gradient: 'from-blue-500 to-blue-700',
      surface: 'bg-gray-800',
      surfaceHover: 'hover:bg-gray-700',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400'
    }
  },
  purple: {
    name: 'Lavender',
    light: {
      primary: 'bg-purple-400',
      primaryHover: 'hover:bg-purple-500',
      secondary: 'bg-purple-300',
      secondaryHover: 'hover:bg-purple-400',
      light: 'bg-purple-100',
      border: 'border-gray-400',
      text: 'text-purple-600',
      ring: 'focus:ring-purple-300',
      gradient: 'from-purple-400 to-purple-600',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-gray-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500'
    },
    dark: {
      primary: 'bg-purple-500',
      primaryHover: 'hover:bg-purple-600',
      secondary: 'bg-purple-600',
      secondaryHover: 'hover:bg-purple-700',
      light: 'bg-purple-900/20',
      border: 'border-purple-500',
      text: 'text-purple-400',
      ring: 'focus:ring-purple-400',
      gradient: 'from-purple-500 to-purple-700',
      surface: 'bg-gray-800',
      surfaceHover: 'hover:bg-gray-700',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400'
    }
  },
  green: {
    name: 'Mint',
    light: {
      primary: 'bg-green-400',
      primaryHover: 'hover:bg-green-500',
      secondary: 'bg-green-400',
      secondaryHover: 'hover:bg-green-700',
      light: 'bg-green-100',
      border: 'border-gray-400',
      text: 'text-green-600',
      ring: 'focus:ring-green-300',
      gradient: 'from-green-400 to-green-600',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-gray-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500'
    },
    dark: {
      primary: 'bg-green-500',
      primaryHover: 'hover:bg-green-600',
      secondary: 'bg-green-600',
      secondaryHover: 'hover:bg-green-700',
      light: 'bg-green-900/20',
      border: 'border-green-500',
      text: 'text-green-400',
      ring: 'focus:ring-green-400',
      gradient: 'from-green-500 to-green-700',
      surface: 'bg-gray-800',
      surfaceHover: 'hover:bg-gray-700',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400'
    }
  },
  orange: {
    name: 'Sunset',
    light: {
      primary: 'bg-orange-400',
      primaryHover: 'hover:bg-orange-500',
      secondary: 'bg-orange-300',
      secondaryHover: 'hover:bg-orange-400',
      light: 'bg-orange-100',
      border: 'border-gray-400',
      text: 'text-orange-600',
      ring: 'focus:ring-orange-300',
      gradient: 'from-orange-400 to-orange-600',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-gray-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500'
    },
    dark: {
      primary: 'bg-orange-500',
      primaryHover: 'hover:bg-orange-600',
      secondary: 'bg-orange-600',
      secondaryHover: 'hover:bg-orange-700',
      light: 'bg-orange-900/20',
      border: 'border-orange-400',
      text: 'text-orange-400',
      ring: 'focus:ring-orange-400',
      gradient: 'from-orange-500 to-orange-700',
      surface: 'bg-gray-800',
      surfaceHover: 'hover:bg-gray-700',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400'
    }
  },
  teal: {
    name: 'Aqua',
    light: {
      primary: 'bg-teal-400',
      primaryHover: 'hover:bg-teal-500',
      secondary: 'bg-teal-300',
      secondaryHover: 'hover:bg-teal-400',
      light: 'bg-teal-100',
      border: 'border-gray-400',
      text: 'text-teal-600',
      ring: 'focus:ring-teal-300',
      gradient: 'from-teal-400 to-teal-600',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-gray-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500'
    },
    dark: {
      primary: 'bg-teal-500',
      primaryHover: 'hover:bg-teal-600',
      secondary: 'bg-teal-600',
      secondaryHover: 'hover:bg-teal-700',
      light: 'bg-teal-900/20',
      border: 'border-teal-500',
      text: 'text-teal-400',
      ring: 'focus:ring-teal-400',
      gradient: 'from-teal-500 to-teal-700',
      surface: 'bg-gray-800',
      surfaceHover: 'hover:bg-gray-700',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400'
    }
  },
  red: {
    name: 'Cherry',
    light: {
      primary: 'bg-red-400',
      primaryHover: 'hover:bg-red-500',
      secondary: 'bg-red-300',
      secondaryHover: 'hover:bg-red-400',
      light: 'bg-red-100',
      border: 'border-gray-400',
      text: 'text-red-600',
      ring: 'focus:ring-red-300',
      gradient: 'from-red-400 to-red-600',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-gray-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500'
    },
    dark: {
      primary: 'bg-red-500',
      primaryHover: 'hover:bg-red-600',
      secondary: 'bg-red-600',
      secondaryHover: 'hover:bg-red-700',
      light: 'bg-red-900/20',
      border: 'border-red-500',
      text: 'text-red-400',
      ring: 'focus:ring-red-400',
      gradient: 'from-red-500 to-red-700',
      surface: 'bg-gray-800',
      surfaceHover: 'hover:bg-gray-700',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400'
    }
  },
  gray: {
    name: 'Slate',
    light: {
      primary: 'bg-gray-400',
      primaryHover: 'hover:bg-gray-500',
      secondary: 'bg-gray-300',
      secondaryHover: 'hover:bg-gray-400',
      light: 'bg-gray-100',
      border: 'border-gray-400',
      text: 'text-gray-600',
      ring: 'focus:ring-gray-300',
      gradient: 'from-gray-400 to-gray-600',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-gray-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500'
    },
    dark: {
      primary: 'bg-gray-500',
      primaryHover: 'hover:bg-gray-600',
      secondary: 'bg-gray-600',
      secondaryHover: 'hover:bg-gray-700',
      light: 'bg-gray-900/20',
      border: 'border-gray-500',
      text: 'text-gray-400',
      ring: 'focus:ring-gray-400',
      gradient: 'from-gray-500 to-gray-700',
      surface: 'bg-gray-800',
      surfaceHover: 'hover:bg-gray-700',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400'
    }
  }
};

// Base background colors for light and dark modes
const baseTheme = {
  light: {
    background: 'bg-gray-100',
    backgroundSecondary: 'bg-gray-50'
  },
  dark: {
    background: 'bg-gray-900',
    backgroundSecondary: 'bg-gray-800'
  }
};

const useThemeStore = create(
  persist(
    (set, get) => ({
      currentColorTheme: 'pink', // Default color theme
      isDarkMode: false, // Default to light mode
      colorThemes,
      
      // Get the current complete theme object
      getTheme: () => {
        const { currentColorTheme, isDarkMode } = get();
        const mode = isDarkMode ? 'dark' : 'light';
        return {
          ...colorThemes[currentColorTheme][mode],
          ...baseTheme[mode],
          isDark: isDarkMode
        };
      },
      
      // Set a new color theme
      setColorTheme: (themeKey) => {
        if (colorThemes[themeKey]) {
          set({ currentColorTheme: themeKey });
        }
      },
      
      // Toggle between light and dark mode
      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },
      
      // Set dark mode explicitly
      setDarkMode: (isDark) => {
        set({ isDarkMode: isDark });
      },
      
      // Get all available color themes for selection
      getAvailableColorThemes: () => {
        return Object.keys(colorThemes).map(key => ({
          key,
          name: colorThemes[key].name,
          lightColors: colorThemes[key].light,
          darkColors: colorThemes[key].dark
        }));
      }
    }),
    {
      name: 'wardrobe-theme-storage',
      partialize: (state) => ({ 
        currentColorTheme: state.currentColorTheme,
        isDarkMode: state.isDarkMode 
      })
    }
  )
);

export default useThemeStore;
