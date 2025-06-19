// components/Wardrobe.jsx
import React, { useState, useEffect } from 'react'; // Import React and useState for managing filter state
import useWardrobeStore from '../store/wardrobeStore'; // Import Zustand store for managing wardrobe state
import useAuthenticationStore from '../store/userStore'; // Import Zustand store for managing user state
import useThemeStore from '../store/themeStore'; // Import theme store
import SearchBar from '../components/SearchBar'; // Import search bar component
import { Fab, Modal, Tooltip, Zoom } from '@mui/material'; // Import Material-UI components
import AddIcon from '@mui/icons-material/Add';
import AddClotheForm from '../components/AddClotheForm';
import TopsIcon from '../images/Wardrobe-Filter-Images/Tops.png';
import AllIcon from '../images/Wardrobe-Filter-Images/All.png';
import BottomsIcon from '../images/Wardrobe-Filter-Images/Bottoms.png';
import JumpSuitIcon from '../images/Wardrobe-Filter-Images/Jump-suit.png';
import ShoesIcon from '../images/Wardrobe-Filter-Images/shoes.png';
import AccessoriesIcon from '../images/Wardrobe-Filter-Images/Accessories.png';
import OuterwearIcon from '../images/Wardrobe-Filter-Images/Outerwear.png';
import DeleteClothingBtn from '../components/DeleteClothingBtn';
import FavoriteIconBtn from '../components/FavoriteIconBtn';
import FavoriteIconCategory from '../components/FavoriteIconCategory';

// Temporary utility to get hex colors from Tailwind classes until theme store is updated
const getThemeHexColor = (tailwindClass, fallback = '#f472b6') => {
  const colorMap = {
    'bg-pink-400': '#f472b6',
    'bg-pink-500': '#ec4899',
    'bg-blue-400': '#60a5fa', 
    'bg-blue-500': '#3b82f6',
    'bg-purple-400': '#c084fc',
    'bg-purple-500': '#a855f7',
    'bg-green-400': '#4ade80',
    'bg-green-500': '#22c55e',
    'bg-orange-400': '#fb923c',
    'bg-orange-500': '#f97316',
    'bg-teal-400': '#2dd4bf',
    'bg-teal-500': '#14b8a6',
    'bg-red-400': '#f87171',
    'bg-red-500': '#ef4444',
    'bg-gray-400': '#9ca3af',
    'bg-gray-500': '#6b7280',
    'hover:bg-pink-500': '#ec4899',
    'hover:bg-pink-600': '#db2777',
    'hover:bg-blue-500': '#3b82f6',
    'hover:bg-blue-600': '#2563eb',
    'hover:bg-purple-500': '#a855f7',
    'hover:bg-purple-600': '#9333ea',
    'hover:bg-green-500': '#22c55e',
    'hover:bg-green-600': '#16a34a',
    'hover:bg-orange-500': '#f97316',
    'hover:bg-orange-600': '#ea580c',
    'hover:bg-teal-500': '#14b8a6',
    'hover:bg-teal-600': '#0d9488',
    'hover:bg-red-500': '#ef4444',
    'hover:bg-red-600': '#dc2626',
    'hover:bg-gray-500': '#6b7280',
    'hover:bg-gray-600': '#4b5563',
    'border-pink-400': '#f472b6',
    'border-blue-300': '#93c5fd',
    'border-purple-400': '#c084fc',
    'border-green-400': '#4ade80',
    'border-orange-400': '#fb923c',
    'border-teal-400': '#2dd4bf',
    'border-red-400': '#f87171',
    'border-gray-400': '#9ca3af',
  };
  return colorMap[tailwindClass] || fallback;
};

// Define the Wardrobe component
function Wardrobe() {
  const [filter, setFilter] = useState('all'); // State to manage the current filter category (default: 'all')
  const [fabVisible, setFabVisible] = useState(true); // State to control the visibility of the Fab button for the zoom effect
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  // Get user data and authentication status from the authentication store
  const { user, isAuthenticated } = useAuthenticationStore();
  
  // Theme store integration
  const { getTheme, isDarkMode } = useThemeStore();
  const theme = getTheme();

  // Get wardrobe items, addClothingItem, showAddForm, toggleAddForm, and fetchWardrobeItems from the wardrobe store
  const { wardrobeItems, showFavoritesOnly, addClothingItem, showAddForm, toggleAddForm, fetchWardrobeItems, searchQuery, getFilteredItems } = useWardrobeStore();

  // Fetch wardrobe items from Firebase when the component mounts and user is authenticated
  useEffect(() => {
    const loadWardrobeItems = async () => {
      if (!isAuthenticated || !user?.uid) {
        setLoading(false);
        setError('Please log in to access your wardrobe.');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        await fetchWardrobeItems(user.uid);
      } catch (err) {
        setError('Failed to load wardrobe items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadWardrobeItems();
  }, [fetchWardrobeItems, user, isAuthenticated]);

  // Log wardrobeItems to verify updates
  useEffect(() => {
    console.log('Wardrobe Items Updated:', wardrobeItems);
    console.log('Current search query:', searchQuery);
    
  }, [wardrobeItems, searchQuery]);

  const filteredItems = getFilteredItems(filter)

  // Handle form submission by adding the new item to the wardrobe store
  const handleSave = (formData) => {
    if (!isAuthenticated || !user?.uid) {
      setError('Please log in to add wardrobe items.');
      return;
    }

    // Ensure all required fields are present
    const newItem = {
      name: formData.name,
      category: formData.category,
      color: formData.color,
      imageUrl: formData.imageUrl,
      notes: formData.notes,
      lastWorn: formData.lastWorn || 'Never',
      createdAt: formData.createdAt
    };

    console.log('Adding New Item:', newItem);
    addClothingItem(newItem, user.uid);
    toggleAddForm(false); // Close the form after saving
  };

  // Get theme colors for FAB and other elements
  const primaryColor = theme.primaryHex || getThemeHexColor(theme.primary);
  const primaryHoverColor = theme.primaryHoverHex || getThemeHexColor(theme.primaryHover);

  // Render loading or error state
  if (loading) {
    return (
      <div className={`px-3 py-10 ${theme.surface} ${theme.textPrimary} text-center transition-colors duration-200`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current ${theme.text} mx-auto`}></div>
        <p className={`mt-4 ${theme.textSecondary}`}>Loading wardrobe items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`px-3 py-10 ${theme.surface} text-center transition-colors duration-200`}>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`px-3 py-1 ${theme.surface} ${theme.textPrimary} overflow-hidden transition-colors duration-200`}>
      <div className="flex gap-6 lg:justify-center mb-3 overflow-x-scroll no-scrollbar">
        {/* All filter button */}
        <button
          className={`px-2 py-2 font-medium flex gap-2 items-center transition-colors duration-200 whitespace-nowrap min-w-fit
            ${filter === 'all' 
              ? `${theme.textPrimary} md:text-xl border-b-2 border-current` 
              : `${theme.textSecondary} md:text-xl hover:cursor-pointer hover:${theme.textPrimary.replace('text-', '')}`
            }`}
          onClick={() => setFilter('all')}
        >
          <img src={AllIcon} alt="all filter icon" className="h-6 w-6 mr-1 sm:h-8 sm:w-8 md:h-10 md:w-10" />
          <span className="inline-block">All</span>
        </button>
        {/* Category filter buttons */}
        {[
          {name:'tops', icon: TopsIcon}, 
          {name:'bottoms', icon: BottomsIcon}, 
          {name:'outerwear', icon: OuterwearIcon}, 
          {name:'shoes', icon: ShoesIcon}, 
          {name:'jump suit', icon: JumpSuitIcon}, 
          {name:'accessories', icon: AccessoriesIcon}
        ].map((category) => (
          <button
            key={category.name}
            className={`px-2 py-2 font-medium flex gap-2 items-center transition-colors duration-200 whitespace-nowrap min-w-fit
              ${filter === category.name 
                ? `${theme.textPrimary} md:text-xl border-b-2 border-current` 
                : `${theme.textSecondary} md:text-xl hover:cursor-pointer hover:${theme.textPrimary.replace('text-', '')}`
              }`}
            onClick={() => setFilter(category.name)}
          >
            <img 
              src={category.icon} 
              alt={category.name + ' filter icon'} 
              className="h-6 w-6 mr-1 sm:h-8 sm:w-8 md:h-10 md:w-10" 
            />
            <span className="inline-block">{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Wardrobe items container */}
      <div className="p-6 w-full h-full mx-auto max-w-[1100px]">
        {/* Favorite Filter button and SearchBar */}
        <div className="flex justify-between items-center gap-8 mb-6 mx-auto ">
          <SearchBar />
          <FavoriteIconCategory  />
        </div>

        {/* Items grid container */}
        <div className="h-[62vh] overflow-scroll no-scrollbar">
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 my-5">
            {/* Map over filtered items to display each wardrobe item */}
            {filteredItems.map((item) => (
              // Item card
              <div key={item.id} className={`${theme.backgroundSecondary || theme.light} px-3 py-2 mx-1.5 flex flex-col rounded-[5px] shadow-sm border ${theme.border} h-[350px] transition-colors duration-200`}>
                {/* favorite and delete icon */}
                <div className="flex justify-between mb-1">
                  <FavoriteIconBtn id={item.id} isFavorite={item.isFavorite} />
                  <DeleteClothingBtn id={item.id} />
                </div>
                <div className="h-full overflow-hidden rounded-[5px] mb-2 md:mb-4 flex text-xs">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    // Fallback item name
                    <span className={`${theme.textMuted}`}>{item.name}</span>
                  )}
                </div>
                {/* Item name */}
                <p className={`text-sm font-medium pb-2 truncate ${theme.textPrimary}`}>{item.name}</p>
                {/* Item details */}
                <div className="flex justify-between">
                  <p className={`text-xs ${theme.textSecondary} capitalize`}>{item.category}</p>
                  <p className={`text-xs ${theme.textSecondary}`}>Last worn: {item.lastWorn || 'Never'}</p>
                </div>
                {item.notes && <p className={`text-xs pb-2 truncate ${theme.textMuted}`}>{item.notes}</p>}
              </div>
            ))}

            {/* Empty state */}
            {wardrobeItems.length === 0 ? (
              // Completely empty wardrobe
              <div className="col-span-full h-[60vh] flex flex-col items-center justify-center text-center">
                <div className={`${theme.textSecondary} mb-4`}>
                  <p className="text-xl mb-2">Your wardrobe is empty</p>
                  <p className={`${theme.textMuted}`}>Add your first clothing item by clicking the + button</p>
                </div>
                <button 
                  onClick={() => toggleAddForm(true)}
                  className={`mt-4 px-6 py-2 rounded-full text-white ${theme.primary} ${theme.primaryHover} transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md`}
                >
                  Add Your First Item
                </button>
              </div>
            ) : filteredItems.length === 0 ? (
              // Has items but none in this category
              <div className={`col-span-full h-[60vh] py-8 text-center ${theme.textSecondary}`}>
                {searchQuery ? (
                  <>
                    <p className="mb-2">No items found with the name "{searchQuery}" or in the "{searchQuery}" category.</p>
                    <p className={`${theme.textMuted}`}>Try searching for a different item or selecting a different category.</p>
                  </>
                ) : (
                  <>
                    <p className="mb-2">No items found in the "{filter}" category.</p>
                    <p className={`${theme.textMuted}`}>Try selecting a different category or add new items to this category.</p>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* Sticky button container */}
        <div className="sticky bottom-3 flex justify-end xl:-mr-20 lg:-mr-6">
          {/* Zoom transition wrapper for the Fab button */}
          <Zoom in={fabVisible} timeout={200}>
            {/* Tooltip for the "Add Item" label */}
            <Tooltip title="Add Item" placement="left">
              {/* Floating action button */}
              <Fab
                sx={{
                  backgroundColor: primaryColor,
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: primaryHoverColor,
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: `0 4px 12px ${primaryColor}40`,
                }}
                aria-label="add"
                onClick={() => toggleAddForm(true)} // Use toggleAddForm to open the form
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Zoom>
        </div>

        {/* Modal for adding a new clothing item */}
        <Modal
          open={showAddForm} // Use showAddForm from the store
          onClose={() => toggleAddForm(false)} // Use toggleAddForm to close the form
          aria-labelledby="add-clothe-modal"
          aria-describedby="modal-to-add-new-clothing-item"
        >
          {/* Modal content */}
          <div className={`${theme.surface} rounded-lg p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] max-h-[95vh] overflow-y-auto no-scrollbar border ${theme.border} shadow-2xl transition-colors duration-200`}>
            {/* Modal header */}
            <div className="flex justify-between items-center mb-6 md:px-20">
              {/* Modal title */}
              <h2 id="add-clothe-modal" className={`text-lg font-bold flex-1 ${theme.textPrimary}`}>
                Add New Item
              </h2>
              {/* Cancel button */}
              <button
                onClick={() => toggleAddForm(false)} // Use toggleAddForm to close the form
                className={`text-white text-sm font-medium px-4 py-2 rounded transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md
                  ${theme.secondary} ${theme.secondaryHover}`}
              >
                Cancel
              </button>
            </div>
            <AddClotheForm onSave={handleSave} />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Wardrobe;