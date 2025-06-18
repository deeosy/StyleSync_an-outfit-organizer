// components/DarkModeToggle.jsx
import React from 'react';
import useThemeStore from '../store/themeStore';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode, getTheme } = useThemeStore();
  const theme = getTheme();

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className={`text-sm font-medium ${theme.textPrimary}`}>
          Dark Mode
        </h4>
        <p className={`text-xs ${theme.textSecondary} mt-1`}>
          {isDarkMode ? 'Dark mode is currently enabled' : 'Light mode is currently enabled'}
        </p>
      </div>
      
      <button
        onClick={toggleDarkMode}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 ${theme.ring} focus:ring-offset-2 ${
          isDarkMode ? theme.primary : 'bg-gray-200'
        }`}
        role="switch"
        aria-checked={isDarkMode}
        aria-label="Toggle dark mode"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isDarkMode ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default DarkModeToggle;

// Optional: components/ThemeCard.jsx - Alternative simplified theme selector
import React from 'react';
import useThemeStore from '../store/themeStore';

const ThemeCard = () => {
  const { currentColorTheme, setColorTheme, isDarkMode, toggleDarkMode, getTheme, getAvailableColorThemes } = useThemeStore();
  const theme = getTheme();
  const availableThemes = getAvailableColorThemes();

  return (
    <div className={`${theme.surface} rounded-lg border ${theme.border} p-4 space-y-4`}>
      <h3 className={`font-medium ${theme.textPrimary}`}>Appearance</h3>
      
      {/* Quick theme buttons */}
      <div className="space-y-2">
        <p className={`text-sm ${theme.textSecondary}`}>Quick Themes:</p>
        <div className="flex flex-wrap gap-2">
          {['pink', 'blue', 'purple', 'green'].map((themeKey) => {
            const themeData = availableThemes.find(t => t.key === themeKey);
            const isActive = currentColorTheme === themeKey;
            
            return (
              <button
                key={themeKey}
                onClick={() => setColorTheme(themeKey)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  isActive 
                    ? `${theme.primary} text-white` 
                    : `${theme.light} ${theme.textSecondary} hover:${theme.surfaceHover}`
                }`}
              >
                {themeData?.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dark mode toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <span className={`text-sm ${theme.textPrimary}`}>
          {isDarkMode ? '🌙 Dark' : '☀️ Light'}
        </span>
        <button
          onClick={toggleDarkMode}
          className={`px-3 py-1 rounded text-xs font-medium ${theme.secondary} ${theme.secondaryHover} text-white transition-colors`}
        >
          Switch to {isDarkMode ? 'Light' : 'Dark'}
        </button>
      </div>
    </div>
  );
};

export { ThemeCard };

// Export all components for easy importing
export { ThemeSelector, ThemePreview, DarkModeToggle };