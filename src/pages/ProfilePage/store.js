import { create } from "zustand";

export const useNotifications = create((set) => ({
    notificationsActive: false,
    deliveryData: {
        name: '',
        city: '',
        phone: '',
        cdek: {
            address: '',
            fullAddress: ''
        }
    },
    setDeliveryData: (field, value) => set((state) => {
        return { deliveryData: { ...state.deliveryData, [field]: value } }
    }),
    setNotificationsActive: (value) => set((state) => {
        return { notificationsActive: value }
    })
}))