import { create } from "zustand";

export const useUserData = create((set) => ({
    user: null,
    setUser: (value) => set((state) => {
        return { user: value }
    })
}))