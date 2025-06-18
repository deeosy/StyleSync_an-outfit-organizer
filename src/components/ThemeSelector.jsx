import React from 'react';
import useThemeStore from '../store/themeStore';

const ThemeSelector = () => {
  const { currentColorTheme, setColorTheme, getAvailableColorThemes, getTheme } = useThemeStore();
  const availableThemes = getAvailableColorThemes();
  const theme = getTheme();

  return (
    <div className="space-y-3">
      <label className={`block text-sm font-medium ${theme.textPrimary}`}>
        Choose Color Theme
      </label>
      <select
        value={currentColorTheme}
        onChange={(e) => setColorTheme(e.target.value)}
        className={`w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.surface} ${theme.textPrimary} focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent`}
      >
        {availableThemes.map((themeOption) => (
          <option key={themeOption.key} value={themeOption.key}>
            {themeOption.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;