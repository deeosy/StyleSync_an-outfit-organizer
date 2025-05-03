// import { create } from 'zustand';
// import { v4 as uuid } from 'uuid';
// import { db } from '../config/firebase'; // Import Firestore instance
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

// // Create Zustand store for managing wardrobe state with Firebase
// const useWardrobeStore = create((set, get) => ({

//   wardrobeItems: [],     // State to hold wardrobe items fetched from Firebase
//   showAddForm: false,    // State to control visibility of the add item form
//   searchQuery: '',   // state for search functionality
//   showFavoritesOnly: false,    // state for favorites filter
//   currentOutfit: { top: null, bottom: null, outerwear: null, shoes: null, accessories: null }, // Initialize currentOutfit
//   savedOutfits: [],   // Saved outfits

//   setSearchQuery: (query) => set({searchQuery: query}),   // set search query based on user input
  
//   // Function to toggle the visibility of the add item form
//   toggleAddForm: (value) => set({ showAddForm: value }),


//   //Toggle favorite filter
//   toggleFavoritesFilter: () => set((state) => ({
//       showFavoritesOnly: !state.showFavoritesOnly
//     })),

//   //  Get filtered items based on category, favorites and search query
//   getFilteredItems: (category = 'all') => {
//     const {wardrobeItems, showFavoritesOnly, searchQuery} = get()

//     let filteredItems = category === 'all'  //first filter by category
//     ? wardrobeItems : wardrobeItems.filter(item => item.category === category);
    
//     if(showFavoritesOnly) {   // filter by favorites if needed
//       filteredItems = filteredItems.filter(item => item.isFavorite)
//     }

//     if(searchQuery.trim()){  // filter by search query if present
//       const query = searchQuery.toLowerCase();
//       filteredItems = filteredItems.filter(item =>
//         item.name?.toLowerCase().includes(query) || 
//         item.category?.toLowerCase().includes(query) ||
//         item.notes?.toLowerCase().includes(query)
//       );
//     }
//     return filteredItems;
//   },


//   // Fetch wardrobe items from Firebase for the authenticated user
//   fetchWardrobeItems: async (userId) => {
//     if (!userId) {
//       console.error('No user ID provided for fetching wardrobe items.');
//       return;
//     }
//     try {
//       const wardrobeCollection = collection(db, 'wardrobe');
//       const q = query(wardrobeCollection, where('userId', '==', userId));
//       const wardrobeSnapshot = await getDocs(q);
      
//       const wardrobeList = wardrobeSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
      
//       console.log('Fetched wardrobe items:', wardrobeList);
//       set({ wardrobeItems: wardrobeList });
//     } catch (error) {
//       console.error('Error fetching wardrobe items:', error);
//       throw error;
//     }
//   },

//   // Add a new clothing item to Firebase
//   addClothingItem: async (item, userId) => {
//     if (!userId) {
//       console.error('No user ID provided for adding wardrobe item.');
//       return;
//     }
//     try {
//       const newItem = { 
//         ...item, 
//         userId: userId,
//         createdAt: new Date().toISOString()
//       };
      
//       const wardrobeCollection = collection(db, 'wardrobe');
//       const docRef = await addDoc(wardrobeCollection, newItem);

//       set((state) => ({
//         wardrobeItems: [...state.wardrobeItems, { ...newItem, id: docRef.id }],
//       }));
//     } catch (error) {
//       console.error('Error adding clothing item:', error);
//     }
//   },

//   // Update an existing clothing item in Firebase
//   updateClothingItem: async (id, updatedItem, userId) => {
//     if (!userId) {
//       console.error('No user ID provided for updating wardrobe item.');
//       return;
//     }
//     try {
//       const itemRef = doc(db, 'wardrobe', id);
//       await updateDoc(itemRef, updatedItem);
      
//       // Update local state
//       set((state) => ({
//         wardrobeItems: state.wardrobeItems.map((item) =>
//           item.id === id ? { ...item, ...updatedItem } : item
//         ),
//       }));
//     } catch (error) {
//       console.error('Error updating clothing item:', error);
//     }
//   },

//   // Delete a clothing item from Firebase
//   deleteClothingItem: async (id, userId) => {
//     if (!userId) {
//       console.error('No user ID provided for deleting wardrobe item.');
//       return;
//     }
//     try {
//       const itemRef = doc(db, 'wardrobe', id);
//       await deleteDoc(itemRef);
      
//       // Update local state
//       set((state) => ({
//         wardrobeItems: state.wardrobeItems.filter((item) => item.id !== id),
//       }));
//     } catch (error) {
//       console.error('Error deleting clothing item:', error);
//     }
//   },

//   // Toggle favorite status for a clothing item
//   toggleFavorite: async (id, userId) => {
//     if(!userId){
//       console.error('No user ID provided for toggling favorite status.');
//       return;
//     }

//     try {
//       const currentItem = get().wardrobeItems.find(item => item.id === id);  //get the current item to check its favorite status

//       if(!currentItem) {
//         console.error('Item not found');
//         return;
//       }
      
//       const updatedItem = { //Toggle the favorite status
//         ...currentItem, isFavorite: !currentItem.isFavorite
//       }

//       const itemRef = doc(db, 'wardrobe', id);  //update in Firebase
//       await updateDoc(itemRef, {isFavorite: updatedItem.isFavorite});

//       set((state) => ({
//         wardrobeItems: state.wardrobeItems.map((item) => 
//           item.id === id ? {...item, isFavorite: updatedItem.isFavorite} : item
//         ),
//       }));
//     } catch (error) {
//       console.error('Error toggling favorite status:', error);
//     }
//   },




//   // Update current outfit
//   updateOutfit: (zone, item) =>
//     set((state) => ({
//       currentOutfit: { ...state.currentOutfit, [zone]: item },
//     })),


//   // Clear current outfit
//   clearOutfit: () =>
//     set({
//       currentOutfit: {
//         top: null,
//         bottom: null,
//         outerwear: null,
//         shoes: null,
//         accessories: null,
//       },
//     }),
  
//   // Save the current outfit
//   saveOutfit: (name) =>
//     set((state) => ({
//       savedOutfits: [
//         ...state.savedOutfits,
//         {
//           id: uuid(),
//           name,
//           items: { ...state.currentOutfit },
//           createdAt: new Date().toISOString(),
//         },
//       ],
//     })),
  
//   // Update saved outfit
//   updateSavedOutfit: (id, updatedOutfit) =>
//     set((state) => ({
//       savedOutfits: state.savedOutfits.map((outfit) =>
//         outfit.id === id ? { ...outfit, ...updatedOutfit } : outfit
//       ),
//     })),
  
//     // Delete saved outfit
//     deleteSavedOutfit: (id) =>
//       set((state) => ({
//         savedOutfits: state.savedOutfits.filter((outfit) => outfit.id !== id),
//       })),
  
//     // Update lastWorn date for items in an outfit
//     wearOutfit: (outfitId) =>
//       set((state) => {
//         const outfit = state.savedOutfits.find((o) => o.id === outfitId);
//         if (!outfit) return state;
  
//         const today = "Today";
//         const updatedItems = state.wardrobeItems.map((item) => {
//           // Check if item is part of the outfit
//           const isInOutfit = Object.values(outfit.items).some(
//             (outfitItem) => outfitItem && outfitItem.id === item.id
//           );
  
//           if (isInOutfit) {
//             return { ...item, lastWorn: today };
//           }
//           return item;
//         });
  
//         return { wardrobeItems: updatedItems };
//       }),
// }));

// export default useWardrobeStore;



import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { db } from '../config/firebase'; // Import Firestore instance
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

// Create Zustand store for managing wardrobe state with Firebase
const useWardrobeStore = create((set, get) => ({
  // State to hold wardrobe items fetched from Firebase
  wardrobeItems: [],

  // State to control visibility of the add item form
  showAddForm: false,

  searchQuery: '',   // state for search functionality

  setSearchQuery: (query) => set({searchQuery: query}),   // set search query based on user input
  
  // Function to toggle the visibility of the add item form
  toggleAddForm: (value) => set({ showAddForm: value }),

  // state for favorites filter
  showFavoritesOnly: false,  

  //Toggle favorite filter
  toggleFavoritesFilter: () => set((state) => ({
      showFavoritesOnly: !state.showFavoritesOnly
    })),

  //  Get filtered items based on category, favorites and search query
  getFilteredItems: (category = 'all') => {
    const {wardrobeItems, showFavoritesOnly, searchQuery} = get()

    let filteredItems = category === 'all'  //first filter by category
    ? wardrobeItems : wardrobeItems.filter(item => item.category === category);
    
    if(showFavoritesOnly) {   // filter by favorites if needed
      filteredItems = filteredItems.filter(item => item.isFavorite)
    }

    if(searchQuery.trim()){  // filter by search query if present
      const query = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name?.toLowerCase().includes(query) || 
        item.category?.toLowerCase().includes(query) ||
        item.notes?.toLowerCase().includes(query)
      );
    }
    return filteredItems;
  },


  // Fetch wardrobe items from Firebase for the authenticated user
  fetchWardrobeItems: async (userId) => {
    if (!userId) {
      console.error('No user ID provided for fetching wardrobe items.');
      return;
    }
    try {
      const wardrobeCollection = collection(db, 'wardrobe');
      const q = query(wardrobeCollection, where('userId', '==', userId));
      const wardrobeSnapshot = await getDocs(q);
      
      const wardrobeList = wardrobeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log('Fetched wardrobe items:', wardrobeList);
      set({ wardrobeItems: wardrobeList });
    } catch (error) {
      console.error('Error fetching wardrobe items:', error);
      throw error;
    }
  },

  // Add a new clothing item to Firebase
  addClothingItem: async (item, userId) => {
    if (!userId) {
      console.error('No user ID provided for adding wardrobe item.');
      return;
    }
    try {
      const newItem = { 
        ...item, 
        userId: userId,
        createdAt: new Date().toISOString()
      };
      
      const wardrobeCollection = collection(db, 'wardrobe');
      const docRef = await addDoc(wardrobeCollection, newItem);

      set((state) => ({
        wardrobeItems: [...state.wardrobeItems, { ...newItem, id: docRef.id }],
      }));
    } catch (error) {
      console.error('Error adding clothing item:', error);
    }
  },

  // Update an existing clothing item in Firebase
  updateClothingItem: async (id, updatedItem, userId) => {
    if (!userId) {
      console.error('No user ID provided for updating wardrobe item.');
      return;
    }
    try {
      const itemRef = doc(db, 'wardrobe', id);
      await updateDoc(itemRef, updatedItem);
      
      // Update local state
      set((state) => ({
        wardrobeItems: state.wardrobeItems.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        ),
      }));
    } catch (error) {
      console.error('Error updating clothing item:', error);
    }
  },

  // Delete a clothing item from Firebase
  deleteClothingItem: async (id, userId) => {
    if (!userId) {
      console.error('No user ID provided for deleting wardrobe item.');
      return;
    }
    try {
      const itemRef = doc(db, 'wardrobe', id);
      await deleteDoc(itemRef);
      
      // Update local state
      set((state) => ({
        wardrobeItems: state.wardrobeItems.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting clothing item:', error);
    }
  },

  // Toggle favorite status for a clothing item
  toggleFavorite: async (id, userId) => {
    if(!userId){
      console.error('No user ID provided for toggling favorite status.');
      return;
    }

    try {
      const currentItem = get().wardrobeItems.find(item => item.id === id);  //get the current item to check its favorite status

      if(!currentItem) {
        console.error('Item not found');
        return;
      }
      
      const updatedItem = { //Toggle the favorite status
        ...currentItem, isFavorite: !currentItem.isFavorite
      }

      const itemRef = doc(db, 'wardrobe', id);  //update in Firebase
      await updateDoc(itemRef, {isFavorite: updatedItem.isFavorite});

      set((state) => ({
        wardrobeItems: state.wardrobeItems.map((item) => 
          item.id === id ? {...item, isFavorite: updatedItem.isFavorite} : item
        ),
      }));
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  },

  // Initialize an empty current outfit with null values for each zone
  currentOutfit: {
    top: null, bottom: null, outerwear: null, shoes: null,
    accessories: []  // Changed to array to allow multiple accessories
  },

  // Update current outfit - modified to handle multiple accessories and jump suits
  updateOutfit: (zone, item) =>
    set((state) => {
      // Special handling for accessories to allow multiple items
      if (zone === 'accessories') {
        // Check if this accessory is already in the outfit
        const accessoryExists = state.currentOutfit.accessories.some(
          accessory => accessory && accessory.id === item.id
        );
        
        if (!accessoryExists) {
          // Add the accessory to the array if it doesn't exist
          return {
            currentOutfit: { 
              ...state.currentOutfit, 
              accessories: [...state.currentOutfit.accessories, item] 
            }
          };
        }
        return state; // No change if accessory already exists
      } else {
        // For other categories, replace the existing item
        // If we're adding a jump suit to the top, we should clear the bottom
        if (zone === 'top' && item && item.category === 'jump suit') {
          return {
            currentOutfit: { 
              ...state.currentOutfit,
              top: item,
              bottom: null // Clear bottom when adding a jump suit
            }
          };
        }
        // If we're adding something to the bottom but have a jump suit in the top,
        // we need to clear the jump suit first
        else if (zone === 'bottom' && state.currentOutfit.top && state.currentOutfit.top.category === 'jump suit') {
          return {
            currentOutfit: {
              ...state.currentOutfit,
              top: null, // Clear the jump suit
              bottom: item // Add the new bottom
            }
          };
        }
        // Normal case - just update the specified zone
        else {
          return {
            currentOutfit: { ...state.currentOutfit, [zone]: item }
          };
        }
      }
    }),

  // Remove an item from the current outfit - enhanced for jump suits
  removeFromOutfit: (zone, itemId) =>
    set((state) => {
      // Special handling for accessories
      if (zone === 'accessories') {
        return {
          currentOutfit: {
            ...state.currentOutfit,
            accessories: state.currentOutfit.accessories.filter(
              item => item && item.id !== itemId
            )
          }
        };
      } else {
        // For other zones, set to null
        return {
          currentOutfit: { ...state.currentOutfit, [zone]: null }
        };
      }
    }),

  // Clear current outfit - updated to handle accessories array
  clearOutfit: () =>
    set({
      currentOutfit: { top: null, bottom: null, outerwear: null, shoes: null, accessories: [] },
    }),

  // Saved outfits
  savedOutfits: [],

  // Save the current outfit - updated to handle the new outfit structure
  saveOutfit: (name) =>
    set((state) => {
      // Only save if there's at least one item in the outfit
      const hasItems = state.currentOutfit.top || 
                      state.currentOutfit.bottom || 
                      state.currentOutfit.outerwear || 
                      state.currentOutfit.shoes || 
                      state.currentOutfit.accessories.length > 0;
      
      if (!hasItems) {
        return state; // Don't save empty outfits
      }

      return {
        savedOutfits: [
          ...state.savedOutfits,
          {
            id: uuid(),
            name,
            items: { ...state.currentOutfit },
            createdAt: new Date().toISOString(),
          },
        ],
      };
    }),

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

  // Update lastWorn date for items in an outfit - updated to handle accessories array
  wearOutfit: (outfitId) =>
    set((state) => {
      const outfit = state.savedOutfits.find((o) => o.id === outfitId);
      if (!outfit) return state;

      const today = "Today";
      const updatedItems = state.wardrobeItems.map((item) => {
        // Check if item is part of the outfit (considering accessories array)
        let isInOutfit = false;
        
        // Check non-accessory zones
        if (outfit.items.top?.id === item.id ||
            outfit.items.bottom?.id === item.id ||
            outfit.items.outerwear?.id === item.id ||
            outfit.items.shoes?.id === item.id) {
          isInOutfit = true;
        }
        
        // Check accessories array
        if (!isInOutfit && outfit.items.accessories) {
          isInOutfit = outfit.items.accessories.some(
            accessory => accessory && accessory.id === item.id
          );
        }

        if (isInOutfit) {
          return { ...item, lastWorn: today };
        }
        return item;
      });

      return { wardrobeItems: updatedItems };
    }),
}));

export default useWardrobeStore;