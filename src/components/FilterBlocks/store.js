import { create } from "zustand";

export const useBrands = create((set) => ({
    data: [],
    uniqueBrandIds: new Set(),
    currentPage: 0,
    isLoading: false,
    hasMore: true,
    setData: (newBrands) => set((state) => {
        const uniqueBrands = [];
        const updatedUniqueBrandIds = new Set(state.uniqueBrandIds);

        for (const brand of newBrands) {
            if (!updatedUniqueBrandIds.has(brand.id)) { // Check for unique ID
                updatedUniqueBrandIds.add(brand.id);
                uniqueBrands.push(brand);
            }
        }

        return {
            data: [...state.data, ...uniqueBrands], // Append only unique brands
            uniqueBrandIds: updatedUniqueBrandIds,
        };
    }),
    setIsLoading: (value) => set(() => {
        return { isLoading: value }
    }),
    setHasMore: (value) => set(() => {
        return { hasMore: value }
    }),
    setCurrentPage: (value) => set(() => {
        console.log('page: ', value);
        return { currentPage: value }
    }),
}));

export const useCategories = create((set) => ({
    data: [],
    isLoading: false,
    setData: (value) => set((state) => {
        return { data: value }
    }),
    setIsLoading: (value) => set(() => {
        return { isLoading: value }
    }),
}));