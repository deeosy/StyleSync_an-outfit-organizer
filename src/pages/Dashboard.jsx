import React from "react";  // Import React library for building the component

// Import Zustand stores for wardrobe and authentication state management
import useWardrobeStore from "../store/wardrobeStore";
import useAuthenticationStore from "../store/userStore";

// Import components for displaying images and tabs
import DisplayImage from "../components/DisplayImage";
import CenteredTabs from "../components/CenteredTabs";

function Dashboard() {
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);    // Access wardrobe items from the wardrobe store

  const { user, isAuthenticated, isLoading } = useAuthenticationStore();    // Access user and authentication state from the authentication store

  if (isLoading) {    // Check if the authentication state is still loading
    return (
      <div className="text-center mt-10 min-h-[400px] ">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) {     // If the user is not authenticated, display a login prompt
    return (
      <p className="text-center mt-10 min-h-[400px]">Please log in to access your wardrobe.</p>
    );
  }

  console.log("User data:", user);    // Log the user object for debugging purposes

  const hasWardrobeItems = wardrobeItems && wardrobeItems.length > 0;     // Added: Check if wardrobeItems is empty and display a message
  
  return (
    <>
      {/* Header section with dynamic background color based on user gender */}
      <div
        className={`w-full h-[60px] md:h-[100px] ${
          user?.gender === "male" ? "bg-blue-200" : "bg-pink-400"
        } relative manrope`}
      >
        {/* Container for the profile image */}
        <div className="relative left-17 top-7 w-fit md:left-30 md:top-14 xl:left-80 xl:top-12 bg-gray-200 rounded-full">
          <DisplayImage />
        </div>
      </div>

      {/* User information section */}
      <div className="my-6">
        {/* Display the user's username from the database */}
        <p className="text-center font-semibold">
          {user?.username || user?.firstName || "Anonymous"}
        </p>
        {/* Display the username with a handle format */}
        <p className="text-center">{`@${user?.username || user?.firstName || "anonymous"}_`}</p>
      </div>

      {/* Main content section with tabs and recent items */}
      <div className="px-3 flex flex-col gap-10">
        {/* Render the CenteredTabs component for navigation */}
        <CenteredTabs />

        {/* Section for displaying recently added wardrobe items */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8 w-full h-full mx-auto max-w-[1200px]">
          <h2 className="text-lg font-semibold mb-4 manrope md:mb-[20px]">
            Recently Added Items
          </h2>

          {/* Conditional rendering if there are no wardrobe items */}
          {!hasWardrobeItems ? (
            <p className="text-center text-gray-600">
              No wardrobe items found. Add some items to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 my-5">
              {/* Display the 3 most recently added wardrobe items in reverse order */}
              {wardrobeItems
                .slice(-3) // Get the last 3 items
                .reverse() // Reverse to show the most recent first
                .map((item) => (
                  <div
                    key={item.id} // Unique key for each item
                    className="bg-gray-100 px-3 py-2 mx-1.5 flex flex-col rounded-[5px] shadow-sm shadow-slate-400 h-[350px]"
                  >
                    {/* Item image with background color */}
                    <div
                      className="h-full overflow-hidden rounded-[5px] mb-2 md:mb-4 flex text-xs"
                      style={{ backgroundColor: item.color }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    {/* Item name with truncation for long names */}
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    {/* Last worn date, default to "Never" if not set */}
                    <p className="text-xs text-gray-600">
                      Last worn: {item.lastWorn || "Never"}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;  // Export the Dashboard component as the default export
