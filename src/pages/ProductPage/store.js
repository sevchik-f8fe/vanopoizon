import { create } from "zustand";

export const useProductPage = create((set) => ({
    currentSize: 33,
    currentPage: 'productPage',
    accordion: {
        'delivery': true,
        'insurance': true,
        'original': true,
    },
    setAccordion: (type) => set(state => {
        // const newAccordion = {
        //     ...state.accordion,
        //     [type]: !state.accordion.type
        // }
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
    setCurrentPage: (value) => set(state => {
        return { currentPage: value };
    }),
}));