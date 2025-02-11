import { create } from "zustand";

export const useProductPage = create((set, get) => ({
    product: null,
    prices: null,
    currentProduct: {
        'size': null,
        'price': null,
        'color': null,
        'images': [],
    },
    isColors: false,
    isSizes: false,
    storeSpuId: null,
    accordion: {
        'insurance': true,
        'original': true,
    },
    usePoints: true,
    useExpressDelivery: false,
    useInsurance: false,

    setCurrentProductField: (field, value) => set(state => {
        console.log(field, value)
        return { currentProduct: { ...state.currentProduct, [field]: value } };
    }),
    setVariations: (field, value) => set(state => {
        return { [field]: value }
    }),
    setProduct: (value) => set(state => {
        return { product: value }
    }),
    setStoreSpuId: (value) => set(state => {
        return { storeSpuId: value }
    }),
    setPrices: (value) => set(state => {
        return { prices: value }
    }),
    setAccordion: (type) => set(state => {
        return {
            accordion: {
                ...state.accordion,
                [type]: !state.accordion[type],
            }
        }
    }),
    setUsePoints: (value) => set(state => {
        return { usePoints: value };
    }),
    setUseExpressDelivery: (value) => set(state => {
        return { useExpressDelivery: value };
    }),
    setUseInsurance: (value) => set(state => {
        return { useInsurance: value };
    }),
}));