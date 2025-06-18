// components/ThemePreview.jsx
import React from 'react';
import useThemeStore from '../store/themeStore';

const ThemePreview = () => {
  const { getAvailableColorThemes, setColorTheme, currentColorTheme, isDarkMode, getTheme } = useThemeStore();
  const availableThemes = getAvailableColorThemes();
  const currentTheme = getTheme();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {availableThemes.map((themeOption) => {
          const themeColors = isDarkMode ? themeOption.darkColors : themeOption.lightColors;
          const isActive = themeOption.key === currentColorTheme;
          
          return (
            <button
              key={themeOption.key}
              onClick={() => setColorTheme(themeOption.key)}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                isActive 
                  ? `border-gray-800 shadow-lg ${currentTheme.ring} ring-2` 
                  : `border-gray-200 hover:border-gray-300 ${currentTheme.border}`
              }`}
            >
              <div className="space-y-2">
                {/* Theme color preview circles */}
                <div className="flex justify-center space-x-1">
                  <div className={`w-4 h-4 rounded-full ${themeColors.primary}`}></div>
                  <div className={`w-4 h-4 rounded-full ${themeColors.secondary}`}></div>
                  <div className={`w-4 h-4 rounded-full ${themeColors.light}`}></div>
                </div>
                
                {/* Theme name */}
                <p className={`text-xs font-medium ${currentTheme.textPrimary}`}>
                  {themeOption.name}
                </p>
                
                {/* Mini preview card */}
                <div className={`${themeColors.surface} rounded p-2 border ${themeColors.border}`}>
                  <div className={`w-full h-1 ${themeColors.primary} rounded mb-1`}></div>
                  <div className={`w-3/4 h-1 ${themeColors.light} rounded`}></div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Current selection indicator */}
      <div className={`p-3 rounded-lg ${currentTheme.light} border ${currentTheme.border}`}>
        <p className={`text-sm ${currentTheme.textPrimary}`}>
          <strong>Current Theme:</strong> {availableThemes.find(t => t.key === currentColorTheme)?.name}
        </p>
        <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>
          Mode: {isDarkMode ? 'Dark' : 'Light'}
        </p>
      </div>
    </div>
  );
};

export default ThemePreview;