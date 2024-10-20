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
    setAccordion: (type) => set(state => {
        console.log(1);
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
    setSplit: (value) => set(state => {
        return { isSplit: value };
    }),
}));