import { create } from "zustand";

export const useCatalog = create((set) => ({
    products: [],
    page: 1,
    typeOfSearch: 'default',
    hasMore: true,
    propsOfSearch: {
        'keyword': null,
        'lowestPrice': null,
        'highestPrice': null,
        'brandId': [],
        'categoryId': [],
        'frontCategoryId': [],
        'fitId': [],
    },
    setPropsOfSearch: (field, value) => set(state => {
        return { propsOfSearch: { ...state.propsOfSearch, [field]: value } }
    }),
    setTypeOfSearch: (value) => set(state => {
        return { typeOfSearch: value }
    }),
    setNextPage: () => set(state => {
        return { page: state.page + 1 }
    }),
    setPage: (value) => set(state => {
        return { page: value }
    }),
    setHasMore: (value) => set(state => {
        return { hasMore: value }
    }),
    setProducts: (data) => set(state => {
        return { products: data }
    }),
    setMoreProducts: (data) => set(state => {
        return { products: [...state.products, ...data] }
    }),
}));