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

    const defaultUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      username: firebaseUser.displayName || 'Anonymous',
      country: '',
      date: '',
      gender: '',
      reason: '',
    };

    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);
      const userData = userSnap.exists() ? userSnap.data() : {};
      set({
        user: {
          ...defaultUser,
          ...userData,
          date: userData.dateOfBirth || '',
        },
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      set({ user: defaultUser, isAuthenticated: true });
    }
  },

  logout: () => set({
    user: { uid: '', country: '', username: '', email: '', date: '', gender: '', reason: '' },
    isAuthenticated: false,
  }),

  updateUser: (name, value) => set((state) => ({
    user: { ...state.user, [name]: value },
  })),
}));

onAuthStateChanged(auth, (user) => {
  if (user) {
    useAuthenticationStore.getState().login(user);
  } else {
    useAuthenticationStore.getState().logout();
  }
});

export default useAuthenticationStore;