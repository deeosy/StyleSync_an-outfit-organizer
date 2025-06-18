import React from 'react';
import ThemeSelector from '../components/ThemeSelector';
import ThemePreview from '../components/ThemePreview';
import DarkModeToggle from '../components/DarkModeToggle';
import useThemeStore from '../store/themeStore';

function AppearanceSettings() {
  const { getTheme } = useThemeStore();
  const theme = getTheme();

  return (
    <div className={`min-h-screen ${theme.background} p-6`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${theme.textPrimary}`}>
          Appearance Settings
        </h1>
        
        <div className="space-y-8">
          {/* Dark Mode Toggle */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${theme.textPrimary}`}>
              Display Mode
            </h2>
            <DarkModeToggle />
          </div>

          {/* Theme Selector */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${theme.textPrimary}`}>
              Color Theme
            </h2>
            <div className="max-w-md">
              <ThemeSelector />
            </div>
          </div>
          
          {/* Theme Preview */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${theme.textPrimary}`}>
              Theme Preview
            </h2>
            <ThemePreview />
          </div>

          {/* Sample UI Components */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${theme.textPrimary}`}>
              Preview Components
            </h2>
            <div className={`${theme.surface} rounded-lg p-6 border ${theme.border} space-y-4`}>
              <div className="flex space-x-4">
                <button className={`px-4 py-2 rounded ${theme.primary} ${theme.primaryHover} text-white font-medium transition-colors`}>
                  Primary Button
                </button>
                <button className={`px-4 py-2 rounded ${theme.secondary} ${theme.secondaryHover} text-white font-medium transition-colors`}>
                  Secondary Button
                </button>
                <button className={`px-4 py-2 rounded border ${theme.border} ${theme.surfaceHover} ${theme.textPrimary} font-medium transition-colors`}>
                  Outline Button
                </button>
              </div>
              
              <div className={`p-4 rounded ${theme.light} border ${theme.border}`}>
                <p className={`${theme.textPrimary} font-medium mb-2`}>Sample Card</p>
                <p className={`${theme.textSecondary} text-sm`}>
                  This is how your content will look with the current theme settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppearanceSettings;