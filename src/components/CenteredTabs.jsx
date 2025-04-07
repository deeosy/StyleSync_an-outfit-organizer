import * as React from 'react';  // Import React and necessary hooks for state management

// Import Material-UI components for tab functionality and layout
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// Import custom hooks for accessing wardrobe and authentication state
import useWardrobeStore from "../store/wardrobeStore";
import useAuthenticationStore from '../store/userStore';

import QuickActionBtn from './QuickActionBtn';  // Import custom component for quick actions
import { Plus, Layers } from 'lucide-react'; // Import icons from lucide-react
import { useNavigate } from 'react-router-dom';   // Import useNavigate for programmatic navigation

export default function CenteredTabs() {

  const [value, setValue] = React.useState('1');   // State to manage the currently active tab (default is '1')

  // Access wardrobe items and saved outfits from the wardrobe store
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const savedOutfits = useWardrobeStore((state) => state.savedOutfits);
  const toggleAddForm = useWardrobeStore(state => state.toggleAddForm);

  const { user, isAuthenticated } = useAuthenticationStore();     // Access user authentication state and user details from the authentication store
  const navigate = useNavigate();    // Hook for navigating programmatically

  if(!isAuthenticated){   // If the user is not authenticated, display a login prompt
    return <p className="text-center mt-10">Please log in to access your wardrobe.</p>;
  }
  
  const handleChange = (event, newValue) => {   // Handler for changing tabs
    setValue(newValue);
  };

  const handleAddItem = () => {   // Handler for the "Add New Item" button: navigates to the wardrobe page and opens the add form
    navigate('/wardrobe');
    toggleAddForm(true);
  };

  const handleCreateOutfit = () => {   // Handler for the "Create Outfit" button: navigates to the outfits page
    navigate('/outfits');
  };

  const categoryCounts = wardrobeItems.reduce((acc, item) => {   // Count wardrobe items by category (e.g., shirts, pants) for display in the "Wardrobe Stats" tab
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // Filter wardrobe items to find those that have never been worn (for the "Unworn Items" tab)
  const unusedItems = wardrobeItems.filter((item) => item.lastWorn === "Never");

  // Determine button background color based on user gender
  const buttonBgClass = user?.gender === 'male' ? "bg-blue-200 hover:bg-blue-300" : "bg-pink-300 hover:bg-pink-400";

  return (
    <Box sx={{ width: '100%', typography: 'body1',  }} className='mx-auto !max-w-[1200px] '>
      {/* TabContext to manage the state of the tabs */}
      <TabContext value={value} >
        {/* TabList container for the tab headers */}
        <Box>
          <TabList  
            centered onChange={handleChange} aria-label="lab API tabs example"
            sx={{
              "& .Mui-selected": { color: '#030200 !important'  }, // Black text for selected tab
              "& .MuiTabs-indicator":{ backgroundColor: user?.gender === 'male' ? "#bedbff" : "#fc64b6" } // Pink underline
            }}
          >
            {/* Tab headers */}
            <Tab label="Wardrobe Stats" value="1"  />
            <Tab label="Unworn Items" value="2" />
            <Tab label="Quick Actions" value="3" />
          </TabList>
        </Box>
        {/* TabPanel for "Wardrobe Stats" */}
        <TabPanel value="1" sx={{padding: '16px 0px', position: 'relative'}} >
          {/* Quick action button component */}
          <QuickActionBtn />

          {/* Container for wardrobe stats with a fixed height and shadow */}
          <div className="h-[300px] drop-shadow-xl ">
            <div className="bg-white rounded-[5px] shadow-sm p-8 h-full overflow-scroll no-scrollbar ">
              <div className="space-y-3 md:space-y-4">
                {/* Display total number of wardrobe items */}
                <p className="text-sm md:text-md text-gray-600">
                  Total Items:{" "}
                  <span className="font-medium md:text-md text-gray-900">
                    {wardrobeItems.length}
                  </span>
                </p>
                {/* Display total number of saved outfits */}
                <p className="text-sm md:text-md text-gray-600">
                  Saved Outfits:{" "}
                  <span className="font-medium md:text-md text-gray-900">
                    {savedOutfits.length}
                  </span>
                </p>
                {/* Display item count for each category */}
                {Object.entries(categoryCounts).map(([category, count]) => (
                  <p key={category} className="text-sm md:text-md text-gray-600">
                    {category.charAt(0).toUpperCase() + category.slice(1)}:{" "}
                    <span className="font-medium md:text-md text-gray-900">{count}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </TabPanel>
        {/* TabPanel for "Unworn Items" */}
        <TabPanel value="2" sx={{padding: '16px 0px', position: 'relative'}}>
          {/* Quick action button component */}
          <QuickActionBtn />
          <div className="h-[300px] drop-shadow-xl">
            <div className="bg-white rounded-lg shadow-sm p-8 h-full no-scrollbar overflow-scroll">
              {/* Check if there are any wardrobe items */}
              {wardrobeItems.length < 1 ? (
                <p className="text-sm text-gray-600">Currently no clothes in your wardrobe</p>
              ) : unusedItems.length > 0 ? (
                // Display list of unworn items (up to 5)
                <ul className="space-y-3">
                  {unusedItems.slice(0, 5).map((item) => (
                    <li key={item.id} className="text-sm flex items-center">
                      <span
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      {item.name}
                    </li>
                  ))}
                  {/* Display a message if there are more than 5 unworn items */}
                  {unusedItems.length > 8 && (
                    <li className="text-sm text-gray-600">
                      And {unusedItems.length - 5} more...
                    </li>
                  )}
                </ul>
              ) : (
                // Display a message if all items have been worn
                <p className="text-sm text-gray-600">
                  Great job! You've worn all your items.
                </p>
              )}
            </div>
          </div>
        </TabPanel>
        
        {/* New Tab Panel for Quick Actions */}
        <TabPanel value="3" sx={{padding: '16px 0px', position: 'relative'}}>
          <QuickActionBtn />
          <div className="h-[300px] drop-shadow-xl">
            <div className="bg-white rounded-lg shadow-sm p-8 h-full">
              <h2 className="text-lg font-semibold mb-4 manrope">Quick Actions</h2>
              
              <div className="flex flex-col gap-4">
                <button 
                  className={`flex items-center justify-center w-full py-3 ${buttonBgClass} text-gray-800 font-medium rounded transition-colors`}
                  onClick={handleAddItem}
                >
                  <Plus size={18} className="mr-2" />
                  Add New Item
                </button>
                
                <button 
                  className={`flex items-center justify-center w-full py-3 ${buttonBgClass} text-gray-800 font-medium rounded transition-colors`}
                  onClick={handleCreateOutfit}
                >
                  <Layers size={18} className="mr-2" />
                  Create Outfit
                </button>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}