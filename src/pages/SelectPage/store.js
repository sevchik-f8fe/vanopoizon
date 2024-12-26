import { create } from "zustand";

export const useSelectPage = create((set) => ({
    searchValue: '',
    data: [],
    currentPage: 0,
    isLoading: false,
    hasMore: true,
    setData: (value) => set((state) => {
        return { data: value }
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