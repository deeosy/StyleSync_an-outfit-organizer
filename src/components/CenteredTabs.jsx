import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useWardrobeStore from "../store/wardrobeStore";
import QuickActionBtn from './QuickActionBtn';
import useAuthenticationStore from '../store/userStore';
import { Plus, Layers } from 'lucide-react'; // Import icons from lucide-react
import { useNavigate } from 'react-router-dom';

export default function CenteredTabs() {
  const [value, setValue] = React.useState('1');
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const savedOutfits = useWardrobeStore((state) => state.savedOutfits);
  const toggleAddForm = useWardrobeStore(state => state.toggleAddForm);
  const { user, isAuthenticated } = useAuthenticationStore();
  const navigate = useNavigate();

  if(!isAuthenticated){
    return <p className="text-center mt-10">Please log in to access your wardrobe.</p>;
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handler for Add New Item button
  const handleAddItem = () => {
    navigate('/wardrobe');
    toggleAddForm(true);
  };

  // Handler for Create Outfit button
  const handleCreateOutfit = () => {
    navigate('/outfits');
  };

  // Count items by category
  const categoryCounts = wardrobeItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // Find unused items (never worn)
  const unusedItems = wardrobeItems.filter((item) => item.lastWorn === "Never");

  // Determine button background color based on user gender
  const buttonBgClass = user?.gender === 'male' ? "bg-blue-200 hover:bg-blue-300" : "bg-pink-300 hover:bg-pink-400";

  return (
    <Box sx={{ width: '100%', typography: 'body1',  }} className='mx-auto !max-w-[1200px] '>
      <TabContext value={value} >
        <Box>
          <TabList  
            centered onChange={handleChange} aria-label="lab API tabs example"
            sx={{
              "& .Mui-selected": { color: '#030200 !important'  }, // Black text for selected tab
              "& .MuiTabs-indicator":{ backgroundColor: user?.gender === 'male' ? "#bedbff" : "#fc64b6" } // Pink underline
            }}
          >
            <Tab label="Wardrobe Stats" value="1"  />
            <Tab label="Unworn Items" value="2" />
            <Tab label="Quick Actions" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{padding: '16px 0px', position: 'relative'}} >
          <QuickActionBtn />
          <div className="h-[300px] drop-shadow-xl ">
            <div className="bg-white rounded-[5px] shadow-sm p-8 h-full overflow-scroll no-scrollbar ">
              <div className="space-y-3 md:space-y-4">
                <p className="text-sm md:text-md text-gray-600">
                  Total Items:{" "}
                  <span className="font-medium md:text-md text-gray-900">
                    {wardrobeItems.length}
                  </span>
                </p>
                <p className="text-sm md:text-md text-gray-600">
                  Saved Outfits:{" "}
                  <span className="font-medium md:text-md text-gray-900">
                    {savedOutfits.length}
                  </span>
                </p>
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
        <TabPanel value="2" sx={{padding: '16px 0px', position: 'relative'}}>
          <QuickActionBtn />
          <div className="h-[300px] drop-shadow-xl">
            <div className="bg-white rounded-lg shadow-sm p-8 h-full no-scrollbar overflow-scroll">
              {wardrobeItems.length < 1 ? (
                <p className="text-sm text-gray-600">Currently no clothes in your wardrobe</p>
              ) : unusedItems.length > 0 ? (
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
                  {unusedItems.length > 8 && (
                    <li className="text-sm text-gray-600">
                      And {unusedItems.length - 5} more...
                    </li>
                  )}
                </ul>
              ) : (
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