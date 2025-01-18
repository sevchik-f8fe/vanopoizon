import { create } from "zustand";

export const useCatalog = create((set) => ({
    products: [],
    page: 1,
    hasMore: true,
    setNextPage: () => set(state => {
        console.log('set next page: ', state.page + 1);
        return { page: state.page + 1 }
    }),
    setPage: (value) => set(() => {
        console.log('set page: ', value);
        return { page: value }
    }),
    setHasMore: (value) => set(() => {
        console.log('hasmore: ', value);
        return { hasMore: value }
    }),
    setProducts: (data) => set(() => {
        console.log('set products: ', data);
        return { products: data }
    }),
    setMoreProducts: (data) => set(state => {
        console.log('set more products: ', data);
        return { products: [...state.products, ...data] }
    }),
}));

export const useFilters = create((set) => ({
    activeFilter: null,
    propsOfSearch: {
        'keyword': { isOpen: true, value: '' },
        'lowestPrice': { isOpen: false, value: '' },
        'highestPrice': { isOpen: false, value: '' },
        'sortType': { isOpen: false, value: null },
        'sortMode': { isOpen: false, value: null },
        'categoryId': { isOpen: false, value: [] },
        'brandId': { isOpen: false, value: [] },
        'fitId': { isOpen: false, value: null },
    },
    searchValue: '',
    values: {
        'lowestPrice': '',
        'highestPrice': '',
        'categoriesId': [],
        'brandsId': [],
        'fitId': null,
        'sort': { type: null, mode: null },
    },
    typeOfSearch: 'default',
    setPropsValue: (field, value) => set(state => {
        console.log('setPropsValue: ', field, ' ', value);
        return { propsOfSearch: { ...state.propsOfSearch, [field]: { ...state.propsOfSearch[field], value } } }
    }),
    setFieldValues: (field, value) => set(state => {
        console.log('setFieldValues: ', field, ' ', value);
        return { values: { ...state.values, [field]: value } }
    }),
    removeFieldValues: (field, value) => set(state => {
        console.log('removeFieldValues: ', field, ' ', value);
        const newArray = state.values[field].filter(elem => elem !== value);

        return { values: { ...state.values, [field]: newArray } }
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