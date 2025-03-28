// pages/Dashboard.jsx
import React from "react";
import useWardrobeStore from "../store/wardrobeStore";
import DisplayImage from "../components/DisplayImage";
import CenteredTabs from "../components/CenteredTabs";
import useAuthenticationStore from "../store/userStore";


function Dashboard() {
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const { user, isAuthenticated } = useAuthenticationStore()
  if(!isAuthenticated){
    return <p className="text-center mt-10">Please log in to access your wardrobe.</p>;
  }

  console.log(user);
  

  return (
    <>
      <div className={`w-full h-[60px] md:h-[100px] ${user?.gender === 'male' ? 'bg-blue-100' : 'bg-pink-400'}  relative manrope `}>
        <div className="relative left-17 top-7 w-fit md:left-30 md:top-14 xl:left-80 xl:top-12 bg-gray-300 rounded-full  ">
          <DisplayImage  />
        </div>
      </div>
      <div className="my-6">
        {/* change name to user name from database */}
        <p className="text-center font-semibold" >{user?.username}</p> 
        <p className="text-center " >{`@${user?.username}_`}</p>
      </div>
      <div className="px-3 flex flex-col gap-10 ">
        <CenteredTabs />

        <div className="bg-white rounded-lg shadow-xl p-6 mb-8 w-full h-full mx-auto max-w-[1200px]">
          <h2 className="text-lg font-semibold mb-4 manrope md:mb-[20px] ">Recently Added Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4 md:gap-8 ">
            {wardrobeItems
              .slice(-3)
              .reverse()
              .map(
                (
                  item // Recent added wordrobe items
                ) => ( 
                  <div
                    key={item.id}
                    className="bg-gray-50 p-3 flex flex-col rounded-[5px] border border-gray-200"
                  >
                    <div
                      className="h-full rounded-[5px] mb-2 md:mb-4 flex text-xs"
                      style={{ backgroundColor: item.color }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <p className="text-sm font-medium truncate ">{item.name}</p>
                    <p className="text-xs text-gray-600">
                      Last worn: {item.lastWorn || "Never"}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
