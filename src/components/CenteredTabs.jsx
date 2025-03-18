import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useWardrobeStore from "../store/wardrobeStore";
import QuickActionBtn from './QuickActionBtn';


export default function CenteredTabs() {
  const [value, setValue] = React.useState('1');
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const savedOutfits = useWardrobeStore((state) => state.savedOutfits);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Count items by category
  const categoryCounts = wardrobeItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // Find unused items (never worn)
  const unusedItems = wardrobeItems.filter((item) => item.lastWorn === "Never");

  return (
    <Box sx={{ width: '100%', typography: 'body1',  }} className='mx-auto !max-w-[1200px] '>
      <TabContext value={value} >
        <Box>
          <TabList  centered onChange={handleChange} aria-label="lab API tabs example"
              sx={{
                "& .Mui-selected": { color: '#030200 !important'  }, // Black text for selected tab
                "& .MuiTabs-indicator": { backgroundColor: "#fc64b6" } // Pink underline
              }}
          >
            <Tab label="Wardrobe Stats" value="1"  />
            <Tab label="Unworn Items" value="2" />
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
        <div className="h-[300px] overflow-scroll ">
          <div className="bg-white rounded-lg shadow-sm p-8 h-full no-scrollbar drop-shadow-xl ">
              {unusedItems.length > 0 ? (
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
      </TabContext>
    </Box>
  );
}