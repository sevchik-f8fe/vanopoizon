import { create } from "zustand";

export const useNotifications = create((set) => ({
    notificationsActive: false,
    setNotificationsActive: (value) => set((state) => {
        return { notificationsActive: value }
    })
}))