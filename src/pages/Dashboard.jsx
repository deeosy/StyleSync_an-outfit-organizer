import React from "react";
import useWardrobeStore from "../store/wardrobeStore";
import useAuthenticationStore from "../store/userStore";
import useThemeStore from "../store/themeStore"; // Add theme store
import DisplayImage from "../components/DisplayImage";
import CenteredTabs from "../components/CenteredTabs";

function Dashboard() {
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const { user, isAuthenticated, isLoading } = useAuthenticationStore();
  const { getTheme } = useThemeStore(); // Get theme
  const theme = getTheme();

  if (isLoading) {
    return (
      <div className={`${theme.background} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme.primary} mx-auto`}></div>
          <p className={`mt-4 ${theme.textSecondary}`}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={`${theme.background} min-h-screen flex items-center justify-center`}>
        <p className={`text-center ${theme.textSecondary}`}>Please log in to access your wardrobe.</p>
      </div>
    );
  }

  const hasWardrobeItems = wardrobeItems && wardrobeItems.length > 0;
  
  return (
    <div className={`min-h-screen ${theme.background}`}>
      {/* Header section with dynamic theming */}
      <div className={`w-full h-[60px] md:h-[100px] ${theme.secondary} relative manrope`}>
        {/* Container for the profile image */}
        <div className="relative left-17 top-7 w-fit md:left-30 md:top-14 xl:left-80 xl:top-12 bg-gray-200 rounded-full">
          <DisplayImage />
        </div>
      </div>

      {/* User information section */}
      <div className="my-6">
        <p className={`text-center font-semibold ${theme.textPrimary}`}>
          {user?.username || user?.firstName || "Anonymous"}
        </p>
        <p className={`text-center ${theme.textSecondary}`}>
          {`@${user?.username || user?.firstName || "anonymous"}_`}
        </p>
      </div>

      {/* Main content section with tabs and recent items */}
      <div className="px-3 flex flex-col gap-10">
        <CenteredTabs />

        {/* Section for displaying recently added wardrobe items */}
        <div className={`${theme.surface} rounded-lg shadow-xl p-6 mb-8 w-full h-full mx-auto max-w-[1200px] border ${theme.border}`}>
          <h2 className={`text-lg font-semibold mb-4 manrope md:mb-[20px] ${theme.textPrimary}`}>
            Recently Added Items
          </h2>

          {!hasWardrobeItems ? (
            <div className="text-center py-12">
              <p className={`${theme.textSecondary} mb-4`}>
                No wardrobe items found. Add some items to get started!
              </p>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${theme.light} flex items-center justify-center`}>
                <svg className={`w-8 h-8 ${theme.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 my-5">
              {wardrobeItems
                .slice(-3)
                .reverse()
                .map((item) => (
                  <div
                    key={item.id}
                    className={`${theme.backgroundSecondary} px-3 py-2 mx-1.5 flex flex-col rounded-[5px] shadow-sm border ${theme.border} h-[350px] transition-all hover:shadow-md`}
                  >
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
                    <p className={`text-sm font-medium truncate ${theme.textPrimary}`}>
                      {item.name}
                    </p>
                    <p className={`text-xs ${theme.textMuted}`}>
                      Last worn: {item.lastWorn || "Never"}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;