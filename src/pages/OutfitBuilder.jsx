import React, { useState } from 'react';
import useWardrobeStore from '../store/wardrobeStore';
import ClothingItem from '../components/ClothingItem';
import Mannequin from '../components/Mannequin';

export default function OutfitBuilder() {
  const [activeCategory, setActiveCategory] = useState('tops');
  const [outfitName, setOutfitName] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false); // New state for drop zone feedback

  const { wardrobeItems, currentOutfit, updateOutfit, clearOutfit, saveOutfit } = useWardrobeStore();

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('itemId', item.id);
    e.dataTransfer.setData('itemCategory', item.category);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const itemId = e.dataTransfer.getData('itemId');
    const category = e.dataTransfer.getData('itemCategory');
    const item = wardrobeItems.find((i) => i.id === itemId);

    if (item) {
      const categoryToZoneMap = {
        tops: 'top',
        bottoms: 'bottom',
        outerwear: 'outerwear',
        shoes: 'shoes',
        accessories: 'accessories',
      };
      const zone = categoryToZoneMap[category];
      if (zone) updateOutfit(zone, item);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => setIsDraggingOver(false);

  const handleSaveOutfit = () => {
    if (outfitName.trim()) {
      saveOutfit(outfitName);
      setOutfitName('');
      alert('Outfit saved!');
    } else {
      alert('Please give your outfit a name');
    }
  };

  const filteredItems = wardrobeItems.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Your Outfit</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex border-b border-gray-200 mb-6">
            {['tops', 'bottoms', 'outerwear', 'shoes', 'accessories'].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeCategory === category
                    ? 'text-purple-800 border-b-2 border-purple-800'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <ClothingItem key={item.id} item={item} onDragStart={handleDragStart} />
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-3 py-8 text-center text-gray-500">
                No items in this category yet.
              </div>
            )}
          </div>
        </div>
        <div
          className={`flex-1 bg-gray-100 rounded-lg p-6 border-2 border-dashed ${
            isDraggingOver ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
          } flex flex-col items-center`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Drag items to dress mannequin</h3>
          <Mannequin currentOutfit={currentOutfit} />
          <div className="mt-6 w-full">
            <div className="mb-4">
              <label htmlFor="outfitName" className="block text-sm font-medium text-gray-700 mb-1">
                Outfit Name
              </label>
              <input
                type="text"
                id="outfitName"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Summer casual"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearOutfit}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleSaveOutfit}
                className="flex-1 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors"
              >
                Save Outfit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}