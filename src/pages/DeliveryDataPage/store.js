import { create } from "zustand";

export const useDeliveryData = create((set) => ({
    'phoneNumber': {
        value: '+7',
        error: { text: '', isError: false },
    },
    loading: false,
    'name': {
        value: '',
        error: { text: '', isError: false },
    },
    'address': '',
    // 'city': { name: '', cityCode: null, cityCoords: [] },
    'city': { name: '', cityCode: null, cityCoords: [] },
    cities: [],
    'cdekAddress': {
        address: '',
        fullAddress: ''
    },
    activeDeliveryType: 'pickup',
    setDeliveryType: (value) => set((state) => {
        return { activeDeliveryType: value }
    }),
    setCities: (data) => set((state) => {
        return { cities: data }
    }),
    setLoading: (value) => set((state) => {
        return { loading: value }
    }),
    setFieldValue: (field, value) => set((state) => {
        return { [field]: { value, error: { ...state[field].error, isError: false } } }
    }),
    setFieldError: (field, error) => set((state) => {
        return { [field]: { ...state[field], error: { isError: true, text: error } } }
    }),
    setSimpleFieldValue: (field, value) => set((state) => {
        return { [field]: value }
    }),
}))