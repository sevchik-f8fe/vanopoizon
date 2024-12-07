import { create } from "zustand";

export const useFilters = create((set) => ({
    filters: {
        min: null,
        max: null,
        categoryies: null,
        fits: null,
        brands: null
    },
    setFilter: (field, value) => set((state) => {
        return { filters: { ...state.filters, [field]: value } }
    })
}))