// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import useWardrobeStore from "../store/wardrobeStore";

function Home() {
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const savedOutfits = useWardrobeStore((state) => state.savedOutfits);

  // Count items by category
  const categoryCounts = wardrobeItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // Find unused items (never worn)
  const unusedItems = wardrobeItems.filter((item) => item.lastWorn === "Never");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Wardrobe</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Wardrobe Stats</h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Total Items:{" "}
              <span className="font-medium text-gray-900">
                {wardrobeItems.length}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Saved Outfits:{" "}
              <span className="font-medium text-gray-900">
                {savedOutfits.length}
              </span>
            </p>
            {Object.entries(categoryCounts).map(([category, count]) => (
              <p key={category} className="text-sm text-gray-600">
                {category.charAt(0).toUpperCase() + category.slice(1)}:{" "}
                <span className="font-medium text-gray-900">{count}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Unworn Items</h2>
          {unusedItems.length > 0 ? (
            <ul className="space-y-2">
              {unusedItems.slice(0, 5).map((item) => (
                <li key={item.id} className="text-sm flex items-center">
                  <span
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name}
                </li>
              ))}
              {unusedItems.length > 5 && (
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

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/wardrobe"
              className="block w-full py-2 px-4 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors text-center"
            >
              Add New Item
            </Link>
            <Link
              to="/outfits"
              className="block w-full py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors text-center"
            >
              Create Outfit
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Recently Added Items</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {wardrobeItems
            .slice(-5)
            .reverse()
            .map(
              (
                item // Recent added wordrobe items
              ) => (
                <div
                  key={item.id}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <div
                    className="h-24 rounded mb-2 flex items-center justify-center text-xs"
                    style={{ backgroundColor: item.color }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gray-600">
                    Last worn: {item.lastWorn || "Never"}
                  </p>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}

export default Home;
