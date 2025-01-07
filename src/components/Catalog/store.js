import { create } from "zustand";

export const useCatalog = create((set) => ({
    products: [],
    page: 1,
    hasMore: true,
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

export const useFilters = create((set) => ({
    activeFilter: null,
    propsOfSearch: {
        'keyword': { isOpen: true, value: null },
        'lowestPrice': { isOpen: false, value: null },
        'highestPrice': { isOpen: false, value: null },
        'sortType': { isOpen: false, value: null },
        'sortMode': { isOpen: false, value: null },
        'categoriesId': { isOpen: false, value: null },
        'frontCategoryId': { isOpen: false, value: null },
        'brandsId': { isOpen: false, value: null },
        'fitId': { isOpen: false, value: null },
    },
    searchValue: '',
    values: {
        'lowestPrice': null,
        'highestPrice': null,
        'categoriesId': null,
        'frontCategoryId': null,
        'brandsId': null,
        'fitId': null,
        'sortType': null,
        'sortMode': null,
    },
    typeOfSearch: 'default',
    setPropsValue: (field, value) => set(state => {
        return { propsOfSearch: { ...state.propsOfSearch, [field]: { ...state.propsOfSearch[field], value } } }
    }),
    setFieldValues: (field, value) => set(state => {
        return { values: { ...state.values, [field]: value } }
    }),
    setActiveFilter: (value) => set(() => {
        return { activeFilter: value }
    }),
    setSearchValue: (value) => set(() => {
        return { searchValue: value }
    }),
    setPropsOpen: (field, value) => set(state => {
        return { propsOfSearch: { ...state.propsOfSearch, [field]: { ...state.propsOfSearch[field], isOpen: value } } }
    }),
    setTypeOfSearch: (value) => set(() => {
        return { typeOfSearch: value }
    }),
}));