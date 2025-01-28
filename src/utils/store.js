import { create } from "zustand";

export const useUserData = create((set) => ({
    // user: { _id: '676063c427b87480aec44a4b' },
    user: null,
    setUser: (value) => set(() => {
        return { user: value }
    })
}))