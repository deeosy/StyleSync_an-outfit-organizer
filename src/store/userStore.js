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
    reason:''
  },

  //update user State
  updateUser: (name, value) => set((state) => ({
    user: {...state.user, [name]: value}
  })),

  // add user to the users array
  addUser: () => set((state) =>{
    const userExists = state.users.some((u)=>u.email === state.user.email) //prevent duplicate users via email
    if(userExists) return state; //Do nothing if user already exists
    return{
      users:[...state.users.map((u) => ({ ...u })), { ...state.user }], //add current users to user array without mutating previous array
      user: { country: '', username: '', email: '', password: '', date: '', gender: ''} //Reset user input
    }
  }),

  //reset user state
  resetUser: () => set(() => ({
    user: { country: '', username: '', email: '', password: '', date: '', gender: '' }
  })),  
}))

export default useAuthencationStore;