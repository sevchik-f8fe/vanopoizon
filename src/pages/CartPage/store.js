import { create } from "zustand";

export const useCart = create((set) => ({
    products: [
        {
            id: 1,
            title: '1 Бобёр коричневый б/у',
            price: '12 000',
            count: 1,
            size: 33,
        },
        {
            id: 2,
            title: '2 Бобёр коричневый б/у',
            price: '12 000',
            count: 1,
            size: 33,
        },
        {
            id: 3,
            title: '3 Бобёр коричневый б/у',
            price: '12 000',
            count: 1,
            size: 33,
        },
        {
            id: 4,
            title: '4 Бобёр коричневый б/у',
            price: '12 000',
            count: 1,
            size: 33,
        },
    ],
    usePoints: false,
    useInsurance: false,
    deliveryDataIsFilled: false,
    toggleUseInsurance: () => set(state => {
        return { useInsurance: !state.useInsurance }
    }),
    setDeliveryDataIsFilled: (value) => set(state => {
        return { deliveryDataIsFilled: value }
    }),
    toggleUsePoints: () => set(state => {
        return { usePoints: !state.usePoints }
    }),
    removeElementFromCart: (elemId) => set(state => {
        return {
            products: [
                ...state.products.filter((elem) => elem.id != elemId)
            ]
        }
    }),
    incProductCount: (elemId) => set(state => ({
        ...state,
        products: state.products.map(product =>
            product.id === elemId ? { ...product, count: product.count + 1 } : product
        )
    })),
    decProductCount: (elemId) => set(state => ({
        ...state,
        products: state.products.map(product =>
            product.id === elemId ? { ...product, count: product.count - 1 } : product
        )
    })),

}));