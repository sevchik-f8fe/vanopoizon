import { create } from "zustand";

export const useBottomBoard = create((set) => ({
    currentPage: 'home',
    isVisible: true,
    setCurrentPage: (value) => set(state => {
        return { currentPage: value };
    }),
    setVisible: (value) => set(state => {
        return { isVisible: value };
    }),
}));