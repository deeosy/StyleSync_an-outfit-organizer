import { create } from 'zustand';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const auth = getAuth();

const useAuthenticationStore = create((set) => ({
  user: { uid: '', country: '', username: '', email: '', date: '', gender: '', reason: '' },
  isAuthenticated: false,

  setUser: (user) => set({ user: user || { uid: '', country: '', username: '', email: '', date: '', gender: '', reason: '' }, isAuthenticated: !!user }),

  login: async (firebaseUser) => {
    if (!firebaseUser) {
      set({ user: { uid: '', country: '', username: '', email: '', date: '', gender: '', reason: '' }, isAuthenticated: false });
      return;
    }

    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        console.warn('User document does not exist in Firestore.');
        // Fallback to basic Firebase data
        set({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            username: firebaseUser.displayName || 'Anonymous',
            country: '',
            date: '',
            gender: '',
            reason: '',
          },
          isAuthenticated: true,
        });
        return;
      }

      const userData = userSnap.data() || {};
      set({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          username: userData.username || firebaseUser.displayName || 'Anonymous',
          country: userData.country || '',
          date: userData.dateOfBirth || '', // Consistent with Firestore naming
          gender: userData.gender || '',
          reason: userData.reason || '',
        },
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // Fallback to basic Firebase data on error
      set({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          username: firebaseUser.displayName || 'Anonymous',
          country: '',
          date: '',
          gender: '',
          reason: '',
        },
        isAuthenticated: true,
      });
    }
  },

  logout: () => set({
    user: { uid: '', country: '', username: '', email: '', date: '', gender: '', reason: '' },
    isAuthenticated: false,
  }),

  updateUser: (name, value) => set((state) => ({
    user: { ...state.user, [name]: value },
  })),

  resetUser: () => set({
    user: { uid: '', country: '', username: '', email: '', date: '', gender: '', reason: '' },
  }),
}));

// Firebase Auth Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    useAuthenticationStore.getState().login(user);
  } else {
    useAuthenticationStore.getState().logout();
  }
});

export default useAuthenticationStore;