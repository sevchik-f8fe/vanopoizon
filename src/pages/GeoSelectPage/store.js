import { create } from "zustand";

export const useGeoSelect = create((set) => ({
    currentObject: null,
    isLoading: true,
    objects: [],
    setIsLoading: (value) => set((state) => {
        return { isLoading: value }
    }),
    setCurrentObject: (value) => set((state) => {
        return { currentObject: value }
    }),
    setObjects: (value) => set((state) => {
        return { objects: value }
    }),
}))