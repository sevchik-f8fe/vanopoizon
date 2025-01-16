import { create } from "zustand";

export const useSelectPage = create((set) => ({
    searchValue: '',
    data: [],
    uniqueCitiesCodes: new Set(),
    currentPage: 0,
    isLoading: false,
    hasMore: true,
    setData: (newCities) => set((state) => {
        const uniqueCities = [];
        const updatedUniqueCitiesCodes = new Set(state.uniqueCitiesCodes);

        for (const city of newCities) {
            if (!updatedUniqueCitiesCodes.has(city.code)) { // Check for unique ID
                updatedUniqueCitiesCodes.add(city.code);
                uniqueCities.push(city);
            }
        }

        return {
            data: [...state.data, ...uniqueCities], // Append only unique brands
            uniqueCitiesCodes: updatedUniqueCitiesCodes,
        };
    }),
    addData: (value) => set((state) => {
        return { data: [...state.data, ...value] }
    }),
    setIsLoading: (value) => set(() => {
        return { isLoading: value }
    }),
    setHasMore: (value) => set(() => {
        return { hasMore: value }
    }),
    setCurrentPage: (value) => set(() => {
        return { currentPage: value }
    }),
    setSearchValue: (value) => set(() => {
        return { searchValue: value }
    }),
}))