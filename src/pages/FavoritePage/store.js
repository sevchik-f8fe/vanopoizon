import { create } from "zustand";

export const useFavorites = create((set) => ({
    products: [],
    isLoading: false,
    setFavorites: (value) => set(state => {
        return { products: value }
    }),
    setIsLoading: (value) => set(state => {
        return { isLoading: value }
    }),
    addToFavorites: (product) => set(state => {
        return { products: [...state.products, product] }
    }),
    removeFromFavorites: (elemId) => set(state => {
        return {
            products: [
                ...state.products.filter((elem) => elem.spuId != elemId)
            ]
        }
    }),
}));