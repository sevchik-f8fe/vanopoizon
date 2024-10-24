import { create } from "zustand";

export const useFavorites = create((set) => ({
    products: [
        {
            id: 1,
            title: '1 Бобёр коричневый б/у',
            price: '12 000',
            size: 33,
        },
        {
            id: 2,
            title: '2 Бобёр коричневый б/у',
            price: '12 000',
            size: 33,
        },
        {
            id: 3,
            title: '3 Бобёр коричневый б/у',
            price: '12 000',
            size: 33,
        },
        {
            id: 4,
            title: '4 Бобёр коричневый б/у',
            price: '12 000',
            size: 33,
        },
        {
            id: 5,
            title: '1 Бобёр коричневый б/у',
            price: '12 000',
            size: 33,
        },
        {
            id: 6,
            title: '2 Бобёр коричневый б/у',
            price: '12 000',
            size: 33,
        },
        {
            id: 7,
            title: '3 Бобёр коричневый б/у',
            price: '12 000',
            size: 33,
        },
        {
            id: 8,
            title: '4 Бобёр коричневый б/у',
            price: '12 000',
            size: 33,
        },
    ],
    removeElementFromFavorites: (elemId) => set(state => {
        return {
            products: [
                ...state.products.filter((elem) => elem.id != elemId)
            ]
        }
    }),
}));