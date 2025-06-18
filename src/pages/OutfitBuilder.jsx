import React, { useState, useEffect } from 'react';
import useWardrobeStore from '../store/wardrobeStore';
import useThemeStore from '../store/themeStore';
import ClothingItem from '../components/ClothingItem';
import SavedOutfitsModal from '../components/SavedOutfitsModal';
import { Close as CloseIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

export default function OutfitBuilder() {
  const [activeCategory, setActiveCategory] = useState('tops');
  const [outfitName, setOutfitName] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showSavedOutfits, setShowSavedOutfits] = useState(false);

  // Theme store integration
  const { getTheme } = useThemeStore();
  const theme = getTheme();

  // Access wardrobe items, current outfit, and actions from the Zustand store
  const { 
    wardrobeItems, 
    currentOutfit, 
    updateOutfit, 
    removeFromOutfit, 
    clearOutfit, 
    saveOutfit 
  } = useWardrobeStore();

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
      // Special handling for jump suits
      if (category === 'jump suit') {
        // For jump suits, update the top zone and clear bottom
        console.log("Adding jump suit:", item);
        updateOutfit('top', item);
        // The bottom clearing is handled in the store now
      } else {
        // Map clothing categories to outfit zones for other items
        const categoryToZoneMap = {
          tops: 'top',
          bottoms: 'bottom',
          outerwear: 'outerwear',
          shoes: 'shoes',
          accessories: 'accessories',
        };
        
        const zone = categoryToZoneMap[category];
        if (zone) {
          console.log(`Adding ${category} to ${zone}:`, item);
          updateOutfit(zone, item);
        }
      }
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

  // Remove item from outfit
  const handleRemoveItem = (zone, itemId) => {
    // Special handling for jump suits
    if (zone === 'top' && currentOutfit.top && currentOutfit.top.category === 'jump suit') {
      // If removing a jump suit, clear both top and bottom zones
      removeFromOutfit('top', itemId);
    } else {
      removeFromOutfit(zone, itemId);
    }
  };

  // Handle loading a saved outfit into the current outfit
  const handleLoadSavedOutfit = (outfitItems) => {
    clearOutfit(); // Clear current outfit first
    
    // Load each part of the saved outfit
    if (outfitItems.top) updateOutfit('top', outfitItems.top);
    if (outfitItems.bottom) updateOutfit('bottom', outfitItems.bottom);
    if (outfitItems.outerwear) updateOutfit('outerwear', outfitItems.outerwear);
    if (outfitItems.shoes) updateOutfit('shoes', outfitItems.shoes);
    
    // Handle accessories array
    if (outfitItems.accessories && outfitItems.accessories.length > 0) {
      outfitItems.accessories.forEach(accessory => {
        updateOutfit('accessories', accessory);
      });
    }
  };

  // Filter wardrobe items based on the active category
  const filteredItems = wardrobeItems.filter((item) => item.category === activeCategory);

  // Check if outfit has any items to display
  const hasOutfitItems = 
    currentOutfit.top || 
    currentOutfit.bottom || 
    currentOutfit.outerwear || 
    currentOutfit.shoes || 
    (currentOutfit.accessories && currentOutfit.accessories.length > 0);
    
  // Check if current top item is a jump suit
  const isJumpSuit = currentOutfit.top && currentOutfit.top.category === 'jump suit';
  
  // Debug logging to track jump suit display issues
  useEffect(() => {
    if (currentOutfit.top) {
      console.log("Current top item:", currentOutfit.top);
      console.log("Is jump suit:", isJumpSuit);
      console.log("Image URL:", currentOutfit.top.imageUrl);
    }
  }, [currentOutfit.top, isJumpSuit]);

  return (
    <div className={`${theme.surface} rounded-lg shadow-sm p-6 mb-8 border ${theme.border} transition-colors duration-200`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-semibold ${theme.textPrimary}`}>Your Outfit</h2>
        
        {/* Saved Outfits Button */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CollectionsIcon />}
          onClick={() => setShowSavedOutfits(true)}
          className={`${theme.secondary} ${theme.secondaryHover} text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md`}
          sx={{
            backgroundColor: 'black',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
        >
          Saved Outfits
        </Button>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-8">
        {/* Left side: Wardrobe items */}
        <div className="flex-1 overflow-hidden">
          {/* Category Tabs */}
          <div className={`flex overflow-x-auto no-scrollbar border-b ${theme.border} mb-6 transition-colors duration-200`}>
            {['tops', 'bottoms', 'outerwear', 'shoes', 'accessories', 'jump suit'].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeCategory === category
                    ? `${theme.textPrimary} border-b-2 border-current`
                    : `${theme.textSecondary} hover:${theme.textPrimary.replace('text-', '')}`
                }`}
                onClick={() => setActiveCategory(category)}
                aria-label={`Select ${category} category`}
                aria-selected={activeCategory === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Grid of clothing items for the selected category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <ClothingItem key={item.id} item={item} onDragStart={handleDragStart} />
            ))}
            {filteredItems.length === 0 && (
              <div className={`col-span-3 py-8 text-center ${theme.textSecondary}`}>
                No items in this category yet.
              </div>
            )}
          </div>
        </div>

        {/* Right side: Flat-lay outfit display */}
        <div 
          className={`md:w-[300px] md:flex-1 ${theme.backgroundSecondary || theme.light} rounded-lg p-6 border-2 border-dashed transition-all duration-200 overflow-hidden ${
            isDraggingOver 
              ? `border-current ${theme.light} opacity-80` 
              : theme.border
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="region" 
          aria-label="Drop zone for creating outfit"
        >
          <h3 className={`text-lg font-medium text-center ${theme.textSecondary} mb-4`}>
            Drag items here to create your outfit
          </h3>

          {/* Outfit display area styled like a flat-lay fashion board */}
          <div className={`relative w-full h-[450px] mx-auto ${theme.surface} rounded-lg shadow-sm border ${theme.border} transition-colors duration-200`}>
            {/* Empty state message */}
            {!hasOutfitItems && (
              <div className={`absolute inset-0 flex items-center justify-center ${theme.textMuted}`}>
                Your outfit will appear here
              </div>
            )}

            {/* Flat-lay outfit display */}
            <div className="absolute inset-0 p-4">
              {/* Jump suit or Top item */}
              {currentOutfit.top && (
                <div 
                  className={`absolute ${isJumpSuit ? 'top-8 left-1/2 transform -translate-x-1/2 max-w-[40%] z-30' : 'top-4 left-1/2 transform -translate-x-1/2 max-w-[45%] z-30'}`}
                  data-is-jumpsuit={isJumpSuit ? "true" : "false"}
                >
                  <div className="relative group">
                    {isJumpSuit ? (
                      // Jump suit specific rendering
                      <div className={`${theme.surface} p-1 border ${theme.border} rounded-md shadow-sm transition-colors duration-200`}>
                        <img 
                          src={currentOutfit.top.imageUrl} 
                          alt={`${currentOutfit.top.name} (Jump Suit)`}
                          className="w-full object-contain max-h-80"
                          onError={(e) => {
                            console.error("Image failed to load:", e);
                            e.target.onerror = null;
                            e.target.src = "/placeholder-jumpsuit.png"; // Fallback image
                          }}
                        />
                      </div>
                    ) : (
                      // Regular top rendering
                      <img 
                        src={currentOutfit.top.imageUrl} 
                        alt={currentOutfit.top.name}
                        className="w-full object-contain max-h-40"
                      />
                    )}
                    <button
                      onClick={() => handleRemoveItem('top', currentOutfit.top.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                      aria-label={`Remove ${isJumpSuit ? 'jump suit' : 'top'}`}
                    >
                      <CloseIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom item - positioned below the top, only show if not a jump suit */}
              {currentOutfit.bottom && !isJumpSuit && (
                <div className="absolute top-44 left-1/2 transform -translate-x-1/2 max-w-[40%] z-20">
                  <div className="relative group">
                    <img 
                      src={currentOutfit.bottom.imageUrl} 
                      alt={currentOutfit.bottom.name}
                      className="w-full object-contain max-h-48"
                    />
                    <button
                      onClick={() => handleRemoveItem('bottom', currentOutfit.bottom.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                      aria-label="Remove bottom"
                    >
                      <CloseIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              )}

              {/* Outerwear - positioned to the side */}
              {currentOutfit.outerwear && (
                <div className="absolute top-16 right-8 max-w-[35%] z-40">
                  <div className="relative group">
                    <img 
                      src={currentOutfit.outerwear.imageUrl} 
                      alt={currentOutfit.outerwear.name}
                      className="w-full object-contain max-h-40"
                      style={{ transform: 'rotate(5deg)' }}
                    />
                    <button
                      onClick={() => handleRemoveItem('outerwear', currentOutfit.outerwear.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                      aria-label="Remove outerwear"
                    >
                      <CloseIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              )}

              {/* Shoes - positioned at the bottom */}
              {currentOutfit.shoes && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-[30%] z-10">
                  <div className="relative group">
                    <img 
                      src={currentOutfit.shoes.imageUrl} 
                      alt={currentOutfit.shoes.name}
                      className="w-full object-contain max-h-28"
                    />
                    <button
                      onClick={() => handleRemoveItem('shoes', currentOutfit.shoes.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                      aria-label="Remove shoes"
                    >
                      <CloseIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              )}

              {/* Accessories - scattered around strategically */}
              {currentOutfit.accessories && currentOutfit.accessories.map((accessory, index) => {
                // Positioning for accessories inspired by fashion flat-lays
                const positions = [
                  { top: '20px', left: '20px', rotate: '-10deg', zIndex: 50 },
                  { top: '40px', left: '30%', rotate: '5deg', zIndex: 50 },
                  { bottom: '100px', left: '15px', rotate: '-5deg', zIndex: 50 },
                  { top: '30px', right: '30%', rotate: '10deg', zIndex: 50 },
                  { bottom: '80px', right: '20px', rotate: '-8deg', zIndex: 50 }
                ];
                
                const position = positions[index % positions.length];
                
                return (
                  <div 
                    key={accessory.id}
                    className="absolute max-w-[20%]"
                    style={{
                      top: position.top,
                      left: position.left,
                      right: position.right,
                      bottom: position.bottom,
                      zIndex: position.zIndex,
                      transform: `rotate(${position.rotate})`
                    }}
                  >
                    <div className="relative group">
                      <img 
                        src={accessory.imageUrl} 
                        alt={accessory.name}
                        className="w-full object-contain max-h-20"
                      />
                      <button
                        onClick={() => handleRemoveItem('accessories', accessory.id)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                        aria-label={`Remove ${accessory.name}`}
                      >
                        <CloseIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Outfit name and save controls */}
          <div className="mt-4">
            <div className="mb-4">
              <label htmlFor="outfitName" className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                Outfit Name
              </label>
              <input
                type="text"
                id="outfitName"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className={`w-full px-3 py-2 border ${theme.border} rounded-md shadow-sm ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:ring-1 transition-colors duration-200 placeholder:${theme.textMuted}`}
                placeholder="Summer casual"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearOutfit}
                className={`flex-1 px-4 py-2 ${theme.backgroundSecondary || theme.light} ${theme.textSecondary} rounded ${theme.surfaceHover} transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md border ${theme.border}`}
              >
                Clear All
              </button>
              <button
                onClick={handleSaveOutfit}
                className={`flex-1 px-4 py-2 ${theme.primary} ${theme.primaryHover} text-white rounded transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                disabled={!hasOutfitItems || !outfitName.trim()}
              >
                Save Outfit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Outfits Modal */}
      <SavedOutfitsModal 
        open={showSavedOutfits} 
        onClose={() => setShowSavedOutfits(false)}
        onSelectOutfit={handleLoadSavedOutfit}
      />
    </div>
  );
}