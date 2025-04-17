import { create } from 'zustand';   // Import the create function from Zustand for state management

// Import Firebase Auth and Firestore functions for authentication and data fetching
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../config/firebase';  // Import the Firestore database instance from the Firebase config

const auth = getAuth();   // Initialize Firebase Auth instance

const defaultUser = {   // Define the shape of the user object for better type safety
  uid: '',
  country: '',
  username: '',
  email: '',
  date: '',
  gender: '',
  reason: '',
  photoURL: '',
};

const useAuthenticationStore = create((set, get) => ({   // Create the Zustand store for managing authentication state

  user: defaultUser,     // Initial state: user object with default empty values
  isAuthenticated: false,     // Initial state: user is not authenticated
  isLoading: true,    // Track loading state while resolving authentication

  setUser: (user) =>     // Function to set the user and authentication state
    set({
      user: user || defaultUser, // Fallback to defaultUser if user is null/undefined
      isAuthenticated: !!user, // Set isAuthenticated based on user presence
    }),

  login: async (firebaseUser) => {     // Function to handle user login and fetch additional user data from Firestore

    if (!firebaseUser) {    // If no Firebase user is provided, reset the state to logged out
      set({
        user: defaultUser,
        isAuthenticated: false,
        isLoading: false, //  Set loading to false after resolving
      });
      return;
    }

    const defaultFirebaseUser = {      // Define a default user object with basic Firebase user data
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      username: firebaseUser.displayName || 'Anonymous',
      country: '',
      date: '',
      gender: '',
      reason: '',
      photoURL: '',
    };

    try {
      // Fetch additional user data from Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);
      const userData = userSnap.exists() ? userSnap.data() : {};

      set({         // Update the store with the merged user data
        user: {
          ...defaultFirebaseUser,
          ...userData,
          date: userData.dateOfBirth || '', // Map dateOfBirth to date field
        },
        isAuthenticated: true,
        isLoading: false, // Added: Set loading to false after successful fetch
      });
    } catch (error) {
      // Log error and fallback to default user data if Firestore fetch fails
      console.error('Failed to fetch user data:', error);
      set({
        user: defaultFirebaseUser,
        isAuthenticated: true,
        isLoading: false, 
      });
    }
  },

  logout: () =>     // Function to handle user logout
    set({
      user: defaultUser,
      isAuthenticated: false,
      isLoading: false, 
    }),

  updateUser: (name, value) =>     // Function to update a specific field in the user object
    set((state) => ({
      user: { ...state.user, [name]: value },
    })),

  setLoading: (loading) => set({ isLoading: loading }),     // Added: Function to set loading state explicitly
}));

const unsubscribe = onAuthStateChanged(auth, (user) => {   // Set up Firebase Auth state listener to handle authentication changes
  useAuthenticationStore.getState().setLoading(true);    // Added: Set loading to true while resolving auth state

  if (user) {
    useAuthenticationStore.getState().login(user);       // If a user is authenticated, trigger the login function
  } else {
    useAuthenticationStore.getState().logout();     // If no user is authenticated, trigger the logout function
  }
});

// Added: Export the unsubscribe function to allow cleanup in the future
// This can be used in a useEffect cleanup function in a component if needed
export const cleanupAuthListener = () => unsubscribe();

export default useAuthenticationStore;    // Export the Zustand store as the default export
