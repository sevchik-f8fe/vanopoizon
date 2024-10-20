import { create } from "zustand";

export const useBottomBoard = create((set) => ({
    currentPage: 'home',
    setCurrentPage: (value) => set(state => {
        return { currentPage: value };
    }),
}));