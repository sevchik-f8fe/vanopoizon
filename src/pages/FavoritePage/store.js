import { create } from "zustand";

export const useFavorites = create((set) => ({
    favorites: [],
    setFavorites: (value) => set(state => {
        let newProducts = new Set(value)
        return { favorites: [...newProducts] }
    }),
    addToFavorites: (product) => set(state => {
        return { favorites: [...state.products, product] }
    }),
    removeFromFavorites: (elemId) => set(state => {
        return {
            favorites: [
                ...state.products.filter((elem) => elem.spuId != elemId)
            ]
        }
    }),
}));