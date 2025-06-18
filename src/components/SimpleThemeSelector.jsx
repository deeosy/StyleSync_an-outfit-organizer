import React from 'react';
import useThemeStore from '../store/themeStore';

const SimpleThemeSelector = () => {
  const store = useThemeStore();
  
  // Safely get data with fallbacks
  const currentTheme = store.currentColorTheme || 'pink';
  const isDark = store.isDarkMode || false;
  
  const themes = [
    { key: 'pink', name: 'Rose' },
    { key: 'blue', name: 'Ocean' },
    { key: 'purple', name: 'Lavender' },
    { key: 'green', name: 'Mint' },
    { key: 'orange', name: 'Sunset' },
    { key: 'teal', name: 'Aqua' },
    { key: 'red', name: 'Cherry' },
    { key: 'gray', name: 'Slate' }
  ];

  return (
    <div className="space-y-4">
      {/* Theme Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Theme
        </label>
        <select
          value={currentTheme}
          onChange={(e) => store.setColorTheme(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {themes.map((theme) => (
            <option key={theme.key} value={theme.key}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dark Mode Toggle */}
      <div>
        <label className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Dark Mode</span>
          <button
            onClick={() => store.toggleDarkMode()}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDark ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </label>
      </div>

      {/* Quick Theme Preview */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Quick Select:</p>
        <div className="flex flex-wrap gap-2">
          {themes.slice(0, 4).map((theme) => (
            <button
              key={theme.key}
              onClick={() => store.setColorTheme(theme.key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                currentTheme === theme.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleThemeSelector;