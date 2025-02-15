import { create } from "zustand";

export const useUserData = create((set) => ({
    user: null,
    setUser: (value) => set(() => {
        return { user: value }
    })
}))