// import { create } from "zustand";
// import { v4 as uuid } from "uuid";
// import { db } from '../config/firebase'  // import firestore instance
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";


// const useWardrobeStore = create((set) => ({  // create Zustand store for managing wardrobe state with Firebase
//   // Wardrobe items
//   wardrobeItems: [ ],

//   // Show add clothing form
//   showAddForm: false, //Shared state for add form visibility
//   toggleAddForm: (value) => set({ showAddForm: value }), // function to update state

//   // // Current outfit
//   // currentOutfit: {
//   //   top: null,
//   //   bottom: null,
//   //   outerwear: null,
//   //   shoes: null,
//   //   accessories: null,
//   // },

//   // fetch wardrobe items from Firebase
//   fetchWardrobeItems:  async () => {
//     try {
//       const wardrobeCollection = collection(db, 'wardrobe');
//       const wardrobeSnapshot = await getDocs(wardrobeCollection);
//       const wardrobeList = wardrobeSnapshot.docs.map((doc)=> ({
//         id: doc.id,   //use firestore document ID
//         ...doc.data(),
//       }));
//       set({wardrobeItems: wardrobeList})
//     } catch (error) {
//       console.error('Error fetching wardrobe items: ', error);
//     }
//   },


//   // Add new clothing item
//   addClothingItem: async (item) =>{
//     try {
//       const newItem = { ...item, id: uuid() }  // generate a uuid for the item
//       const wardrobeCollection = collection(db, 'wardrobe');
//       const docRef = await addDoc(wardrobeCollection, newItem)

//       set((state) => ({   // update locat state with the new item
//         wardrobeItems: [...state.wardrobeItems, { ...newItem, id: docRef.id }],
//       }));
//     } catch (error) {
//       console.error('Error adding clothing item: ', error);
//     }
//   },

//   // Update an existing clothing item in firebase
//   updateClothingItem: async (id, updatedItem) => {
//     try {
//         const itemRef = doc(db, 'wardrobe', id);
//         await updateDoc(itemRef, updatedItem);

//       set((state) => ({  // update local state
//         wardrobeItems: state.wardrobeItems.map((item) =>
//           item.id === id ? { ...item, ...updatedItem } : item
//         ),
//       }));
//     } catch (error) {
//       console.error('Error updating clothing item: ', error);
//     }
//   },

//   // Delete clothing item
//   deleteClothingItem: async (id) => {
//     try {
//         const itemRef = doc((db, 'wardrobe', id));
//         await deleteDoc(itemRef);
        
//       set((state) => ({   // update local state
//         wardrobeItems: state.wardrobeItems.filter((item) => item.id !== id),
//         // Also remove from current outfit if it's there
//         currentOutfit: Object.entries(state.currentOutfit).reduce(
//           (acc, [key, item]) => {
//             acc[key] = item && item.id === id ? null : item;
//             return acc;
//           },
//           { ...state.currentOutfit }
//         ),
//       }))
//     } catch (error) {
//       console.error('Error deleting clothing item: ', error);
      
//     }
//   },






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

  // Function to toggle the visibility of the add item form
  toggleAddForm: (value) => set({ showAddForm: value }),

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

  //Toggle favorite filter
  toggleFavoritesFilter: () => 
    set((state) => ({
      showFavoritesOnly: !state.showFavoritesOnly
    })),



  // Update current outfit
  updateOutfit: (zone, item) =>
    set((state) => ({
      currentOutfit: { ...state.currentOutfit, [zone]: item },
    })),


      // Saved outfits
  savedOutfits: [],


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