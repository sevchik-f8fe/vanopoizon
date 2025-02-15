import { create } from "zustand";

export const useUserData = create((set) => ({
    user: { _id: '67acb9426fba420d6f771b30' },
    setUser: (value) => set(() => {
        return { user: value }
    })
}))