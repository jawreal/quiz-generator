import { create } from "zustand";

interface IUser {
  fullName: string | null;
  username: string | null; 
}

interface IAuthStore extends IUser {
  isLoggedIn: boolean;
  clearSession: () => void;
  setUser: (user: Partial<IUser>) => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
  fullName: null, 
  username: null, 
  isLoggedIn: false,
  clearSession: () => set({ fullName: null, username: null, isLoggedIn: false }), 
  setUser: (user) => set({ ...user, isLoggedIn: !!user?.fullName && !!user?.username }) // isLoggedIn will be true if fullName and username exist 
}));


export { type IAuthStore, useAuthStore };