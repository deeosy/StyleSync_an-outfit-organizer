// store/wardrobeStore.js
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useWardrobeStore = create((set) => ({
  // Wardrobe items
  wardrobeItems: [
    { id: uuidv4(), name: 'White T-Shirt', category: 'tops', color: '#ffffff', lastWorn: '2 days ago', imageUrl: null, notes: '' },
    { id: uuidv4(), name: 'Blue Jeans', category: 'bottoms', color: '#0e4f8b', lastWorn: 'Yesterday', imageUrl: null, notes: 'Slim fit, size 32' },
    { id: uuidv4(), name: 'Black Blazer', category: 'outerwear', color: '#222222', lastWorn: 'Last week', imageUrl: null, notes: 'From H&M' },
    { id: uuidv4(), name: 'Brown Boots', category: 'shoes', color: '#663300', lastWorn: '3 days ago', imageUrl: 'https://i.ebayimg.com/images/g/QVQAAOSwb6xlB-~R/s-l1600.webp', notes: 'Size 10' },
    { id: uuidv4(), name: 'Red Blouse', category: 'tops', color: '#cc0000', lastWorn: 'Never', imageUrl: null, notes: '' },
    { id: uuidv4(), name: 'Khaki Pants', category: 'bottoms', color: '#c3b091', lastWorn: '5 days ago', imageUrl: null, notes: '' },
    { id: uuidv4(), name: 'Winter Coat', category: 'outerwear', color: '#444444', lastWorn: 'Last month', imageUrl: null, notes: 'Down filled, very warm' },
    { id: uuidv4(), name: 'Gold Necklace', category: 'accessories', color: '#ffd700', lastWorn: 'Yesterday', imageUrl: null, notes: '18K gold' },
    { id: uuidv4(), name: 'Blue Jeans', category: 'bottoms', color: '#0e4f8b', lastWorn: 'Yesterday', imageUrl: null, notes: 'Slim fit, size 32' },

  ],
  
  // Current outfit
  currentOutfit: {
    top: null,
    bottom: null,
    outerwear: null,
    shoes: null,
    accessories: null,
  },
  
  // Saved outfits
  savedOutfits: [],
  
  // Add new clothing item
  addClothingItem: (item) => set((state) => ({
    wardrobeItems: [...state.wardrobeItems, { ...item, id: uuidv4() }]
  })),
  
  // Update clothing item
  updateClothingItem: (id, updatedItem) => set((state) => ({
    wardrobeItems: state.wardrobeItems.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    )
  })),
  
  // Delete clothing item
  deleteClothingItem: (id) => set((state) => ({
    wardrobeItems: state.wardrobeItems.filter(item => item.id !== id),
    // Also remove from current outfit if it's there
    currentOutfit: Object.entries(state.currentOutfit).reduce((acc, [key, item]) => {
      acc[key] = item && item.id === id ? null : item;
      return acc;
    }, {...state.currentOutfit})
  })),
  
  // Update current outfit
  updateOutfit: (zone, item) => set((state) => ({
    currentOutfit: { ...state.currentOutfit, [zone]: item }
  })),
  
  // Clear current outfit
  clearOutfit: () => set({
    currentOutfit: {
      top: null,
      bottom: null,
      outerwear: null,
      shoes: null,
      accessories: null,
    }
  }),
  
  // Save the current outfit
  saveOutfit: (name) => set((state) => ({
    savedOutfits: [
      ...state.savedOutfits, 
      { 
        id: uuidv4(), 
        name, 
        items: { ...state.currentOutfit },
        createdAt: new Date().toISOString()
      }
    ]
  })),
  
  // Update saved outfit
  updateSavedOutfit: (id, updatedOutfit) => set((state) => ({
    savedOutfits: state.savedOutfits.map(outfit => 
      outfit.id === id ? { ...outfit, ...updatedOutfit } : outfit
    )
  })),
  
  // Delete saved outfit
  deleteSavedOutfit: (id) => set((state) => ({
    savedOutfits: state.savedOutfits.filter(outfit => outfit.id !== id)
  })),
  
  // Update lastWorn date for items in an outfit
  wearOutfit: (outfitId) => set((state) => {
    const outfit = state.savedOutfits.find(o => o.id === outfitId);
    if (!outfit) return state;
    
    const today = 'Today';
    const updatedItems = state.wardrobeItems.map(item => {
      // Check if item is part of the outfit
      const isInOutfit = Object.values(outfit.items).some(
        outfitItem => outfitItem && outfitItem.id === item.id
      );
      
      if (isInOutfit) {
        return { ...item, lastWorn: today };
      }
      return item;
    });
    
    return { wardrobeItems: updatedItems };
  }),
}));

export default useWardrobeStore;