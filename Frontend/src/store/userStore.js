import { create } from "zustand";

const useAuthencationStore =create((set) => ({
  user:{
    username: '',
    email: '',
    password: '',
    country: '',
  },

  //update user State
  updateUser: (name, value) => set((state) => ({
    user: {...state.user, [name]: value}
  })),

  //reset user state
  resetUser: () => set({user:{username:'', email: '', password: '', country:''}}),
  
}))

export default useAuthencationStore;