import { create } from "zustand";

export const useFavorites = create((set) => ({
    products: [],
    setFavorites: (value) => set(state => {
        return { products: value }
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