import { create } from "zustand";

export const useDeliveryData = create((set) => ({
    deliveryData: {
        'fullName': { value: '', error: null },
        'phone': { value: '+7', error: null },
        'city': { value: { name: '', code: '', coords: [] }, error: null },
        'fullAddress': { value: '', error: null },
        'pvz': { value: { smallAddress: '', fullAddress: '' }, error: null },
        'deliveryType': { value: 'pickup', error: null },
    },
    loading: false,
    cities: [],
    setFieldValue: (field, value) => set((state) => {
        return { deliveryData: { ...state.deliveryData, [field]: { error: null, value } } }
    }),
    setFieldError: (field, error) => set((state) => {
        return { deliveryData: { ...state.deliveryData, [field]: { ...state.deliveryData[field], error } } }
    }),
    setCities: (data) => set(() => {
        return { cities: data }
    }),
    setLoading: (value) => set(() => {
        return { loading: value }
    }),
}))