import { create } from "zustand";

export const useProductPage = create((set) => ({
    currentSize: 33,
    accordion: {
        'delivery': true,
        'insurance': true,
        'original': true,
    },
    isSplit: false,
    usePoints: true,
    useExpressDelivery: false,
    useInsurance: false,
    setAccordion: (type) => set(state => {
        return {
            accordion: {
                ...state.accordion,
                [type]: !state.accordion[type],
            }
        }
    }),
    setCurrentSize: (value) => set(state => {
        return { currentSize: value };
    }),
    setUsePoints: (value) => set(state => {
        return { usePoints: value };
    }),
    setUseExpressDelivery: (value) => set(state => {
        return { useExpressDelivery: value };
    }),
    setUseInsurance: (value) => set(state => {
        return { useInsurance: value };
    }),
    setSplit: (value) => set(state => {
        return { isSplit: value };
    }),
}));