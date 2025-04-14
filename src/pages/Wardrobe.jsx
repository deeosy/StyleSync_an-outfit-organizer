// // pages/Wardrobe.jsx
// import React, { useState } from 'react';
// import useWardrobeStore from '../store/wardrobeStore';
// import AddClotheForm from '../components/AddClotheForm';
// import useAuthenticationStore from '../store/userStore';
// import SearchBar from '../components/SearchBar';
// import FavoriteIcon from '../components/FavoriteIcon';
// import AddIcon from '@mui/icons-material/Add';
// import { Fab } from '@mui/material';

// function Wardrobe() {
//   const [filter, setFilter] = useState('all');
//   const { user } = useAuthenticationStore();

  
//   const wardrobeItems = useWardrobeStore(state => state.wardrobeItems);
//   const showAddForm = useWardrobeStore(state => state.showAddForm);
//   const toggleAddForm = useWardrobeStore( state => state.toggleAddForm)
  
//   const filteredItems = filter === 'all' 
//     ? wardrobeItems 
//     : wardrobeItems.filter(item => item.category === filter);
  
//   return (
//     <div className='px-3 py-10 bg-white '>

// {/* 
//       <div className="flex justify-between items-center mb-6 mx-auto max-w-[1200px]">
//         <h1 className="text-xl sm:text-3xl font-bold">My Wardrobe</h1>
//         <button
//           onClick={() => toggleAddForm(!showAddForm)}
//           className={`px-4 py-2 text-xs sm:text-lg hover:cursor-pointer text-white rounded transition-colors
//             ${ user?.gender === 'male' ? 'bg-blue-200' : 'bg-pink-400'}  
//             ${ user?.gender === 'male' ? 'hover:bg-blue-300' : 'hover:bg-pink-600'}
//           `}
//         >
//           {showAddForm ? 'Cancel' : '+ New Item'}
//         </button>
//       </div> */}
//       <div className="flex justify-between items-center gap-8 mb-6 mx-auto max-w-[1200px]">
//       <SearchBar /> 
//       <FavoriteIcon />

//       </div>
//       {showAddForm && (
//         <AddClotheForm />
//       )}
      
//       <div className=" p-6 w-full h-full mx-auto max-w-[1100px]">
//         <div className="flex sm:justify-center mb-6 overflow-x-auto no-scrollbar">
//           <button 
//             className={`px-4 py-2 font-medium transition-colors whitespace-nowrap 
//               ${ filter === 'all' 
//                 ? 'text-gray-900 md:text-xl border-b-2' 
//                 : 'text-gray-500 md:text-xl hover:cursor-pointer'
//               }
//               ${ user?.gender === 'male' ? 'border-blue-300' : 'border-pink-400'}  
//             `}
//             onClick={() => setFilter('all')}
//           >
//             All
//           </button>
//           {['tops', 'bottoms', 'outerwear', 'shoes', 'accessories'].map(category => (
//             <button 
//               key={category}
//               className={`px-4 py-2 font-medium transition-colors whitespace-nowrap 
//                 ${ filter === category 
//                 ? 'text-gray-900 md:text-xl border-b-2' 
//                 : 'text-gray-500 md:text-xl hover:cursor-pointer'
//                 }
//                 ${ user?.gender === 'male' ? 'border-blue-300' : 'border-pink-400'}
//               `}
//               onClick={() => setFilter(category)}
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </button>
//           ))}
//         </div>
//         <div className="sm:h-[70vh] h-[100vh] overflow-scroll no-scrollbar">
//           <div className="grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-8 my-5   ">
//             {filteredItems.map(item => (
//               <div key={item.id} className="bg-gray-50 p-3 flex flex-col rounded-[5px] border border-gray-200">
                
//                 <div 
//                   className="h-full rounded-[5px] mb-2 md:mb-4 flex text-xs"
//                 >
//                   {item.imageUrl ? (
//                     <img 
//                       src={item.imageUrl} 
//                       alt={item.name} 
//                       className="w-full h-[full] object-cover rounded" />
//                   ) : (
//                     <span>{item.name}</span>
//                   )}
//                 </div>
//                 <p className="text-sm font-medium pb-2 truncate">{item.name}</p>
//                 <div className="flex justify-between">
//                   <p className="text-xs text-gray-600 capitalize">{item.category}</p>
//                   <p className="text-xs text-gray-600 ">Last worn: {item.lastWorn || 'Never'}</p>
//                 </div>
//                 {item.notes && <p className="text-xs pb-2 truncate text-gray-500">{item.notes}</p>}
//               </div>
//             ))}
            
//             {filteredItems.length === 0 && (
//               <div className="col-span-full h-[60vh] py-8 text-center text-gray-500">
//                 No items found in this category.
//               </div>
//             )}
//           </div>

//         </div>
//         <div className="sticky bottom-3 flex justify-end xl:-mr-20 lg:-mr-6 ">
//           <Fab sx={{backgroundColor: `${user?.gender === 'male' ? '#bedbff' : '#fc64b6'}`, "&:hover": { backgroundColor: `${user?.gender === 'male' ? '#8ec5ff' : '#e054a3'}`}}} 
//             aria-label="add" onClick={() => toggleAddForm(!showAddForm)}
//           >
//             <AddIcon  />
//           </Fab>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Wardrobe;







// // Import React and useState for managing filter state
// import React, { useState } from 'react';
// // Import Zustand store for managing wardrobe state
// import useWardrobeStore from '../store/wardrobeStore';
// // Import Zustand store for managing user state
// import useAuthenticationStore from '../store/userStore';
// // Import search bar component
// import SearchBar from '../components/SearchBar';
// // Import favorite icon component
// import FavoriteIcon from '../components/FavoriteIcon';
// // Import Material-UI components for the floating action button, modal, tooltip, and zoom transition
// import { Fab, Modal, Tooltip, Zoom } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import AddClotheForm from '../components/AddClotheForm';

// // Define the Wardrobe component
// function Wardrobe() {
//   // State to manage the current filter category (default: 'all')
//   const [filter, setFilter] = useState('all');
//   // State to manage the modal's open/close state
//   const [modalOpen, setModalOpen] = useState(false);
//   // State to control the visibility of the Fab button for the zoom effect
//   const [fabVisible, setFabVisible] = useState(true);
//   // Get user data from the authentication store
//   const { user } = useAuthenticationStore();
//   // Get wardrobe items and addClothingItem function from the wardrobe store
//   const { wardrobeItems, addClothingItem } = useWardrobeStore();

//   // Filter wardrobe items based on the selected category
//   const filteredItems = filter === 'all'
//     ? wardrobeItems
//     : wardrobeItems.filter(item => item.category === filter);

//   // Handle opening the modal
//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   // Handle closing the modal
//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   // Handle form submission by adding the new item to the wardrobe store
//   const handleSave = (formData) => {
//     // Create new item with required fields
//     const newItem = {
//       name: formData.itemName,
//       category: formData.category,
//       color: formData.color,
//       notes: formData.notes,
//       imageUrl: formData.imageUrl,
//       lastWorn: 'Never', // Default value for new items
//       favorite: '', // Initialize with empty favorite status
//     };
    
//     // Add the new item to the wardrobe store using the function from Zustand
//     addClothingItem(newItem);
    
//     // Close the modal after saving
//     setModalOpen(false);
//   };

//   return (
//     // Main container: 3-unit horizontal padding, 10-unit vertical padding, white background, dark text
//     <div className="px-3 py-10 bg-white text-[#212529]">
//       {/* Header with search and favorite: flex layout, justified between, 8-unit gap, 6-unit bottom margin, max width 1200px, centered */}
//       <div className="flex justify-between items-center gap-8 mb-6 mx-auto max-w-[1200px]">
//         {/* Search bar component */}
//         <SearchBar />
//         {/* Favorite icon component */}
//         <FavoriteIcon />
//       </div>

//       {/* Wardrobe items container: 6-unit padding, full width and height, max width 1100px, centered */}
//       <div className="p-6 w-full h-full mx-auto max-w-[1100px]">
//         {/* Filter buttons: flex layout, centered on small screens, 6-unit bottom margin, horizontal scroll, no scrollbar */}
//         <div className="flex sm:justify-center mb-6 overflow-x-auto no-scrollbar">
//           {/* All filter button: 4-unit padding, medium font, no wrap, conditional styling based on filter and user gender */}
//           <button
//             className={`px-4 py-2 font-medium transition-colors whitespace-nowrap 
//               ${filter === 'all'
//                 ? 'text-gray-900 md:text-xl border-b-2'
//                 : 'text-gray-500 md:text-xl hover:cursor-pointer'
//               }
//               ${user?.gender === 'male' ? 'border-blue-300' : 'border-pink-400'}`}
//             onClick={() => setFilter('all')}
//           >
//             All
//           </button>
//           {/* Category filter buttons: 4-unit padding, medium font, no wrap, conditional styling based on filter and user gender */}
//           {['tops', 'bottoms', 'outerwear', 'shoes', 'accessories'].map(category => (
//             <button
//               key={category}
//               className={`px-4 py-2 font-medium transition-colors whitespace-nowrap 
//                 ${filter === category
//                   ? 'text-gray-900 md:text-xl border-b-2'
//                   : 'text-gray-500 md:text-xl hover:cursor-pointer'
//                 }
//                 ${user?.gender === 'male' ? 'border-blue-300' : 'border-pink-400'}`}
//               onClick={() => setFilter(category)}
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Items grid container: 70vh height on small screens, 100vh on others, scrollable, no scrollbar */}
//         <div className="sm:h-[70vh] h-[100vh] overflow-scroll no-scrollbar">
//           {/* Grid layout: 1 column on small screens, 3 columns on medium, 4-unit gap on small screens, 8-unit on medium, 5-unit vertical margin */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 my-5">
//             {/* Map over filtered items to display each wardrobe item */}
//             {filteredItems.map(item => (
//               // Item card: gray background, 3-unit padding, flex column layout, rounded, gray border
//               <div key={item.id} className="bg-gray-50 p-3 flex flex-col rounded-[5px] border border-gray-200">
//                 {/* Image or name: full height, rounded, 2-unit bottom margin on small screens, 4-unit on medium, flex layout, small font */}
//                 <div className="h-full rounded-[5px] mb-2 md:mb-4 flex text-xs">
//                   {item.imageUrl ? (
//                     // Item image: full width, full height, object cover, rounded
//                     <img
//                       src={item.imageUrl}
//                       alt={item.name}
//                       className="w-full h-[full] object-cover rounded"
//                     />
//                   ) : (
//                     // Fallback item name
//                     <span>{item.name}</span>
//                   )}
//                 </div>
//                 {/* Item name: small font, medium weight, 2-unit bottom padding, truncated */}
//                 <p className="text-sm font-medium pb-2 truncate">{item.name}</p>
//                 {/* Item details: flex layout, justified between */}
//                 <div className="flex justify-between">
//                   {/* Category: small font, gray-600 text, capitalized */}
//                   <p className="text-xs text-gray-600 capitalize">{item.category}</p>
//                   {/* Last worn: small font, gray-600 text */}
//                   <p className="text-xs text-gray-600">Last worn: {item.lastWorn || 'Never'}</p>
//                 </div>
//                 {/* Notes: small font, gray-500 text, 2-unit bottom padding, truncated */}
//                 {item.notes && <p className="text-xs pb-2 truncate text-gray-500">{item.notes}</p>}
//               </div>
//             ))}

//             {/* Empty state: full column span, 60vh height, 8-unit vertical padding, centered, gray-500 text */}
//             {filteredItems.length === 0 && (
//               <div className="col-span-full h-[60vh] py-8 text-center text-gray-500">
//                 No items found in this category.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Sticky button container: sticky positioning, bottom 3-unit, aligned to the right, negative right margin on large screens */}
//         <div className="sticky bottom-3 flex justify-end xl:-mr-20 lg:-mr-6">
//           {/* Zoom transition wrapper for the Fab button */}
//           <Zoom in={fabVisible} timeout={200}>
//             {/* Tooltip for the "Add Item" label: appears on hover, positioned to the left */}
//             <Tooltip title="Add Item" placement="left">
//               {/* Floating action button: custom background color based on gender, hover effect, aria-label for accessibility */}
//               <Fab
//                 sx={{
//                   backgroundColor: user?.gender === 'male' ? '#bedbff' : '#fc64b6', // Light blue for male, pink for female
//                   '&:hover': { 
//                     backgroundColor: user?.gender === 'male' ? '#8ec5ff' : '#e054a3', // Darker shade on hover
//                   },
//                 }}
//                 aria-label="add"
//                 onClick={handleOpenModal} // Open the modal on click
//               >
//                 {/* Material-UI Add icon */}
//                 <AddIcon />
//               </Fab>
//             </Tooltip>
//           </Zoom>
//         </div>

//         {/* Modal for adding a new clothing item */}
//         <Modal
//           open={modalOpen} // Control modal visibility
//           onClose={handleCloseModal} // Close modal when clicking outside or pressing escape
//           aria-labelledby="add-clothe-modal"
//           aria-describedby="modal-to-add-new-clothing-item"
//         >
//           {/* Modal content: white background, rounded, 6-unit padding, centered, max width 800px */}
//           <div className="bg-white rounded-lg p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] max-h-[95vh] overflow-y-auto no-scrollbar">
//             {/* Modal header: flex layout, justified between, items centered */}
//             <div className="flex justify-between items-center mb-6">
//               {/* Modal title: large font, bold, centered within its flex space */}
//               <h2 id="add-clothe-modal" className="text-lg font-bold flex-1 text-center">
//                 Add New Item
//               </h2>
//               {/* Cancel button: pink background, white text, small font, rounded, 2-unit padding */}
//               <button
//                 onClick={handleCloseModal}
//                 className="bg-pink-400 text-white text-sm font-medium px-4 py-2 rounded hover:bg-pink-500 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//             {/* AddClotheForm component with onSave handler to save data and close modal */}
//             <AddClotheForm onSave={handleSave} />
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default Wardrobe;

// Import React and useState for managing filter state
import React, { useState, useEffect } from 'react';
// Import Zustand store for managing wardrobe state
import useWardrobeStore from '../store/wardrobeStore';
// Import Zustand store for managing user state
import useAuthenticationStore from '../store/userStore';
// Import search bar component
import SearchBar from '../components/SearchBar';
// Import favorite icon component
import FavoriteIcon from '../components/FavoriteIcon';
// Import Material-UI components for the floating action button, modal, tooltip, and zoom transition
import { Fab, Modal, Tooltip, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddClotheForm from '../components/AddClotheForm';

// Define the Wardrobe component
function Wardrobe() {
  // State to manage the current filter category (default: 'all')
  const [filter, setFilter] = useState('all');
  // State to control the visibility of the Fab button for the zoom effect
  const [fabVisible, setFabVisible] = useState(true);
  // Get user data from the authentication store
  const { user } = useAuthenticationStore();
  // Get wardrobe items, addClothingItem, showAddForm, and toggleAddForm from the wardrobe store
  const { wardrobeItems, addClothingItem, showAddForm, toggleAddForm } = useWardrobeStore();

  // Log wardrobeItems to verify updates
  useEffect(() => {
    console.log('Wardrobe Items Updated:', wardrobeItems);
  }, [wardrobeItems]);

  // Filter wardrobe items based on the selected category
  const filteredItems = filter === 'all'
    ? wardrobeItems
    : wardrobeItems.filter(item => item.category === filter);

  // Handle form submission by adding the new item to the wardrobe store
  const handleSave = (formData) => {
    const newItem = {
      id: Date.now(), // Simple ID generation (will be overridden by addClothingItem in the store)
      imageUrl: formData.imageUrl, // Uploaded image URL
      name: formData.itemName,
      category: formData.category,
      color: formData.color,
      notes: formData.notes,
      lastWorn: 'Never', // Default value for new items
    };
    console.log('Adding New Item:', newItem);
    addClothingItem(newItem);
    toggleAddForm(false); // Close the form after saving
  };

  return (
    // Main container: 3-unit horizontal padding, 10-unit vertical padding, white background, dark text
    <div className="px-3 py-10 bg-white text-[#212529]">
      {/* Header: flex layout, justified between, 8-unit gap, 6-unit bottom margin, max width 1200px, centered */}
      <div className="flex justify-between items-center gap-8 mb-6 mx-auto max-w-[1200px]">
        <SearchBar />
        <FavoriteIcon />
      </div>

      {/* Wardrobe items container: 6-unit padding, full width and height, max width 1100px, centered */}
      <div className="p-6 w-full h-full mx-auto max-w-[1100px]">
        {/* Filter buttons: flex layout, centered on small screens, 6-unit bottom margin, horizontal scroll, no scrollbar */}
        <div className="flex sm:justify-center mb-6 overflow-x-auto no-scrollbar">
          {/* All filter button: 4-unit padding, medium font, conditional styling */}
          <button
            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap 
              ${filter === 'all'
                ? 'text-gray-900 md:text-xl border-b-2'
                : 'text-gray-500 md:text-xl hover:cursor-pointer'
              }
              ${user?.gender === 'male' ? 'border-blue-300' : 'border-pink-400'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {/* Category filter buttons: 4-unit padding, medium font, conditional styling */}
          {['tops', 'bottoms', 'outerwear', 'shoes', 'accessories'].map(category => (
            <button
              key={category}
              className={`px-4 py-2 font-medium transition-colors whitespace-nowrap 
                ${filter === category
                  ? 'text-gray-900 md:text-xl border-b-2'
                  : 'text-gray-500 md:text-xl hover:cursor-pointer'
                }
                ${user?.gender === 'male' ? 'border-blue-300' : 'border-pink-400'}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Items grid container: 70vh height on small screens, 100vh on others, scrollable, no scrollbar */}
        <div className="sm:h-[70vh] h-[100vh] overflow-scroll no-scrollbar">
          {/* Grid layout: 1 column on small screens, 3 columns on medium, 4-unit gap on small screens, 8-unit on medium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 my-5">
            {/* Map over filtered items to display each wardrobe item */}
            {filteredItems.map(item => (
              // Item card: gray background, 3-unit padding, flex column layout, rounded, gray border
              <div key={item.id} className="bg-gray-50 p-3 flex flex-col rounded-[5px] border border-gray-200">
                {/* Image or name: full height, rounded, 2-unit bottom margin on small screens, 4-unit on medium */}
                <div className="h-full rounded-[5px] mb-2 md:mb-4 flex text-xs">
                  {item.imageUrl ? (
                    // Item image: full width, full height, object cover, rounded
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-[full] object-cover rounded"
                    />
                  ) : (
                    // Fallback item name
                    <span>{item.name}</span>
                  )}
                </div>
                {/* Item name: small font, medium weight, 2-unit bottom padding, truncated */}
                <p className="text-sm font-medium pb-2 truncate">{item.name}</p>
                {/* Item details: flex layout, justified between */}
                <div className="flex justify-between">
                  {/* Category: small font, gray-600 text, capitalized */}
                  <p className="text-xs text-gray-600 capitalize">{item.category}</p>
                  {/* Last worn: small font, gray-600 text */}
                  <p className="text-xs text-gray-600">Last worn: {item.lastWorn || 'Never'}</p>
                </div>
                {/* Notes: small font, gray-500 text, 2-unit bottom padding, truncated */}
                {item.notes && <p className="text-xs pb-2 truncate text-gray-500">{item.notes}</p>}
              </div>
            ))}

            {/* Empty state: full column span, 60vh height, 8-unit vertical padding, centered, gray-500 text */}
            {filteredItems.length === 0 && (
              <div className="col-span-full h-[60vh] py-8 text-center text-gray-500">
                No items found in this category.
              </div>
            )}
          </div>
        </div>

        {/* Sticky button container: sticky positioning, bottom 3-unit, aligned to the right */}
        <div className="sticky bottom-3 flex justify-end xl:-mr-20 lg:-mr-6">
          {/* Zoom transition wrapper for the Fab button */}
          <Zoom in={fabVisible} timeout={200}>
            {/* Tooltip for the "Add Item" label: appears on hover, positioned to the left */}
            <Tooltip title="Add Item" placement="left">
              {/* Floating action button: custom background color based on gender, hover effect */}
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
          {/* Modal content: white background, rounded, 6-unit padding, centered, max width 800px */}
          <div className="bg-white rounded-lg p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] max-h-[95vh] overflow-y-auto no-scrollbar">
            {/* Modal header: flex layout, justified between, items centered */}
            <div className="flex justify-between items-center mb-6 md:px-20">
              {/* Modal title: large font, bold, centered within its flex space */}
              <h2 id="add-clothe-modal" className="text-lg font-bold flex-1">
                Add New Item
              </h2>
              {/* Cancel button: pink background, white text, small font, rounded, 2-unit padding */}
              <button
                onClick={() => toggleAddForm(false)} // Use toggleAddForm to close the form
                className="bg-pink-400 text-white text-sm font-medium px-4 py-2 rounded hover:bg-pink-500 transition-colors"
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