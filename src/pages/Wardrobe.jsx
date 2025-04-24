// components/Wardrobe.jsx
import React, { useState, useEffect } from 'react'; // Import React and useState for managing filter state
import useWardrobeStore from '../store/wardrobeStore'; // Import Zustand store for managing wardrobe state
import useAuthenticationStore from '../store/userStore'; // Import Zustand store for managing user state
import SearchBar from '../components/SearchBar'; // Import search bar component
import FavoriteIcon from '../components/FavoriteIconCategory'; // Import favorite icon component
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


// Define the Wardrobe component
function Wardrobe() {
  const [filter, setFilter] = useState('all'); // State to manage the current filter category (default: 'all')
  const [fabVisible, setFabVisible] = useState(true); // State to control the visibility of the Fab button for the zoom effect
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  // Get user data and authentication status from the authentication store
  const { user, isAuthenticated } = useAuthenticationStore();
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

  // Render loading or error state
  if (loading) {
    return (
      <div className="px-3 py-10 bg-white text-[#212529] text-center">
        Loading wardrobe items...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 py-10 bg-white text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="px-3 py-1 bg-white text-[#212529] overflow-hidden  ">
      <div className="flex gap-6 lg:justify-center mb-3 overflow-x-scroll no-scrollbar">
        {/* All filter button */}
        <button
          className={`px-2 py-2 font-medium flex gap-2 items-center transition-colors whitespace-nowrap min-w-fit
            ${filter === 'all' ? 'text-gray-900 md:text-xl border-b-2' : 'text-gray-500 md:text-xl hover:cursor-pointer'}
            ${user?.gender === 'male' ? 'border-blue-300' : 'border-pink-400'}`}
          onClick={() => setFilter('all')}
        >
          <img src={AllIcon} alt="tops filter icon" className="h-6 w-6 mr-1 sm:h-8 sm:w-8 md:h-10 md:w-10" />
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
            className={`px-2 py-2 font-medium flex gap-2 items-center transition-colors whitespace-nowrap min-w-fit
              ${filter === category.name ? 'text-gray-900 md:text-xl border-b-2' : 'text-gray-500 md:text-xl hover:cursor-pointer'}
              ${user?.gender === 'male' ? 'border-blue-300' : 'border-pink-400'}`}
            onClick={() => setFilter(category.name)}
          >
            <img 
              src={category.icon} 
              alt={category + ' filter icon'} 
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
              <div key={item.id} className="bg-gray-100 px-3 py-2 mx-1.5 flex flex-col rounded-[5px] shadow-sm shadow-slate-400 h-[350px] ">
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
                    <span>{item.name}</span>
                  )}
                </div>
                {/* Item name */}
                <p className="text-sm font-medium pb-2 truncate">{item.name}</p>
                {/* Item details */}
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600 capitalize">{item.category}</p>
                  <p className="text-xs text-gray-600">Last worn: {item.lastWorn || 'Never'}</p>
                </div>
                {item.notes && <p className="text-xs pb-2 truncate text-gray-500">{item.notes}</p>}
              </div>
            ))}

            {/* Empty state */}
            {wardrobeItems.length === 0 ? (
              // Completely empty wardrobe
              <div className="col-span-full h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="text-gray-500 mb-4">
                  <p className="text-xl mb-2">Your wardrobe is empty</p>
                  <p className="text-gray-400">Add your first clothing item by clicking the + button</p>
                </div>
                <button 
                  onClick={() => toggleAddForm(true)}
                  className={`mt-4 px-6 py-2 rounded-full text-white ${user?.gender === 'male' ? 'bg-blue-400 hover:bg-blue-500' : 'bg-pink-400 hover:bg-pink-500'} transition-colors`}
                >
                  Add Your First Item
                </button>
              </div>
            ) : filteredItems.length === 0 ? (
              // Has items but none in this category
              <div className="col-span-full h-[60vh] py-8 text-center text-gray-500">
                {searchQuery ? (
                  <>
                    <p className="mb-2">No items found with the name "{searchQuery}" or in the "{searchQuery}" category.</p>
                    <p>Try searching for a different item or selecting a different category.</p>
                  </>
                ) : (
                  <>
                    <p className="mb-2">No items found in the "{filter}" category.</p>
                    <p>Try selecting a different category or add new items to this category.</p>
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
                  backgroundColor: user?.gender === 'male' ? '#bedbff' : '#fc64b6',
                  '&:hover': {
                    backgroundColor: user?.gender === 'male' ? '#8ec5ff' : '#e054a3',
                  },
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
          <div className="bg-white rounded-lg p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] max-h-[95vh] overflow-y-auto no-scrollbar">
            {/* Modal header */}
            <div className="flex justify-between items-center mb-6 md:px-20">
              {/* Modal title */}
              <h2 id="add-clothe-modal" className="text-lg font-bold flex-1">
                Add New Item
              </h2>
              {/* Cancel button */}
              <button
                onClick={() => toggleAddForm(false)} // Use toggleAddForm to close the form
                className={` text-white text-sm font-medium px-4 py-2 rounded transition-colors
                  ${user.gender === 'male' ? 'bg-blue-200 hover:bg-blue-300' : 'bg-pink-400 hover:bg-pink-500' }`}
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