import { create } from "zustand";
import { v4 as uuid } from "uuid";
import longSkirt from "../images/straight-jeans-skirt.png";
import blackBlouse from "../images/black-silk-blouse.png";
import shortSkirt from "../images/a-line-skirt.png";
import grayShortSkirt from "../images/gray-short-skirt.png";
import blackSilkVest from "../images/Black-Silk-Vest.png";
import brownMules from "../images/Brown-Mules.png";
import blackSlipperHeels from "../images/Black-Slipper-Heels.png";
import offShoulderMaxiDress from "../images/Black-Off-Shoulder-Dress.png";
import blueJeansTrousers from "../images/Blue-Jeans-Trousers.png";

const useWardrobeStore = create((set) => ({
  // Wardrobe items
  wardrobeItems: [
    {
      id: uuid(),
      name: "Blue Jeans Trousers",
      category: "bottoms",
      color: "#0e4f8b",
      lastWorn: "Yesterday",
      imageUrl: blueJeansTrousers,
      favorite: '',
      notes: "Slim fit, size 32",
    },
    {
      id: uuid(),
      name: "Black Off-Shoulder Maxi Dress",
      category: "tops",
      color: "#ffffff",
      lastWorn: "2 days ago",
      imageUrl: offShoulderMaxiDress,
      favorite: '',
      notes: "",
    },
    {
      id: uuid(),
      name: "Black Slipper Heels",
      category: "outerwear",
      color: "#222222",
      lastWorn: "Last week",
      imageUrl: blackSlipperHeels,
      favorite: '',
      notes: "From H&M",
    },
    {
      id: uuid(),
      name: "Brown Mules",
      category: "shoes",
      color: "#663300",
      lastWorn: "3 days ago",
      imageUrl: brownMules,
      favorite: '',
      notes: "Size 10",
    },
    {
      id: uuid(),
      name: "Black Silk Vest",
      category: "tops",
      color: "#cc0000",
      lastWorn: "Never",
      imageUrl: blackSilkVest,
      favorite: '',
      notes: "",
    },
    {
      id: uuid(),
      name: "Gray Short Skirt",
      category: "bottoms",
      color: "#c3b091",
      lastWorn: "5 days ago",
      imageUrl: grayShortSkirt,
      favorite: '',
      notes: "",
    },
    {
      id: uuid(),
      name: "A-Line Skirt",
      category: "outerwear",
      color: "#444444",
      lastWorn: "Last month",
      imageUrl: shortSkirt,
      favorite: '',
      notes: "A-Lined, very short",
    },
    {
      id: uuid(),
      name: "Black Silk Blouse",
      category: "tops",
      color: "#ffd700",
      lastWorn: "Yesterday",
      imageUrl: blackBlouse,
      favorite: '',
      notes: "blouse with ribbon",
    },
    {
      id: uuid(),
      name: "Straight Jeans Skirt",
      category: "bottoms",
      color: "#0e4f8b",
      lastWorn: "Yesterday",
      imageUrl: longSkirt,
      favorite: '',
      notes: "long skirts, size 28",
    },
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

  // // Show add clothing form
  showAddForm: false, //Shared state for add form visibility
  toggleAddForm: (value) => set({ showAddForm: value }), // function to update state

  // Add new clothing item
  addClothingItem: (item) =>
    set((state) => ({
      wardrobeItems: [...state.wardrobeItems, { ...item, id: uuid() }],
    })),

  // Update clothing item
  updateClothingItem: (id, updatedItem) =>
    set((state) => ({
      wardrobeItems: state.wardrobeItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    })),

  // Delete clothing item
  deleteClothingItem: (id) =>
    set((state) => ({
      wardrobeItems: state.wardrobeItems.filter((item) => item.id !== id),
      // Also remove from current outfit if it's there
      currentOutfit: Object.entries(state.currentOutfit).reduce(
        (acc, [key, item]) => {
          acc[key] = item && item.id === id ? null : item;
          return acc;
        },
        { ...state.currentOutfit }
      ),
    })),

  // Update current outfit
  updateOutfit: (zone, item) =>
    set((state) => ({
      currentOutfit: { ...state.currentOutfit, [zone]: item },
    })),

  // Clear current outfit
  clearOutfit: () =>
    set({
      currentOutfit: {
        top: null,
        bottom: null,
        outerwear: null,
        shoes: null,
        accessories: null,
      },
    }),

  // Save the current outfit
  saveOutfit: (name) =>
    set((state) => ({
      savedOutfits: [
        ...state.savedOutfits,
        {
          id: uuid(),
          name,
          items: { ...state.currentOutfit },
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  // Update saved outfit
  updateSavedOutfit: (id, updatedOutfit) =>
    set((state) => ({
      savedOutfits: state.savedOutfits.map((outfit) =>
        outfit.id === id ? { ...outfit, ...updatedOutfit } : outfit
      ),
    })),

  // Delete saved outfit
  deleteSavedOutfit: (id) =>
    set((state) => ({
      savedOutfits: state.savedOutfits.filter((outfit) => outfit.id !== id),
    })),

  // Update lastWorn date for items in an outfit
  wearOutfit: (outfitId) =>
    set((state) => {
      const outfit = state.savedOutfits.find((o) => o.id === outfitId);
      if (!outfit) return state;

      const today = "Today";
      const updatedItems = state.wardrobeItems.map((item) => {
        // Check if item is part of the outfit
        const isInOutfit = Object.values(outfit.items).some(
          (outfitItem) => outfitItem && outfitItem.id === item.id
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
