import { create } from "zustand"

export const useCalc = create((set) => ({
    page: 0,
    nextPage: () => set((state) => ({ page: state.page + 1 })),
    prevPage: () => set((state) => ({ page: state.page - 1 })),

}))