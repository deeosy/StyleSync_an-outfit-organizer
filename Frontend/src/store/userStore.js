import { create } from "zustand";

const useAuthencationStore =create((set) => ({
  users: [], 
  user:{
    country: '',
    username: '',
    email: '',
    password: '',
    date:'',
    gender: '',
  },

  //update user State
  updateUser: (name, value) => set((state) => ({
    user: {...state.user, [name]: value}
  })),

  // add user to the users array
  addUser: () => set((state) =>({
    users:[...state.users, state.user], //add current users to user array
    user: { country: '', username: '', email: '', password: '', date: '', gender: ''} //Reset user input
  })),

  //reset user state
  resetUser: () => set({user:{username:'', email: '', password: '', country:'', date:'', gender:''}}),
  
}))

export default useAuthencationStore;