import { create } from "zustand";

export const useUserData = create((set) => ({
    user: {},
    setUser: (value) => set((state) => {
        return { user: value }
    })
}))