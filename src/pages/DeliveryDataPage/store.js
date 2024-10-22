import { create } from "zustand";

export const useDeliveryData = create((set) => ({
    'phoneNumber': {
        value: '+7',
        error: null,
    },
    'name': {
        value: '',
        error: null,
    },
    'address': '',
    'city': '',
    'cdekAddress': '',
    activeDeliveryType: 'pickup',
    setDeliveryType: (value) => set((state) => {
        return { activeDeliveryType: value }
    }),
    setFieldValue: (field, value) => set((state) => {
        return { [field]: { value } }
    }),
    setFieldError: (field, error) => set((state) => {
        return { [field]: { error } }
    }),
    setSimpleFieldValue: (field, value) => set((state) => {
        return { [field]: value }
    }),
}))