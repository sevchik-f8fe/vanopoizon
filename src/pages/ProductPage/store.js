import { create } from "zustand";

export const useProductPage = create((set) => ({
    currentSize: 33,
    accordion: {
        'delivery': true,
        'insurance': true,
        'original': true,
    },
    isSplit: false,
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
    setSplit: (value) => set(state => {
        return { isSplit: value };
    }),
}));