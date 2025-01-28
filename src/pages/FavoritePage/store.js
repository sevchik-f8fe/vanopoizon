import { create } from "zustand";
import axios from "axios";

export const useFavorites = create((set) => ({
    favorites: [],
    setFavorites: (value) => set(state => {
        let newProducts = new Set(value)
        return { favorites: [...newProducts] }
    }),
    addToFavorites: (product, userId) => set(state => {
        let tg = window?.Telegram?.WebApp;

        const fetchAddToFavorites = async (userId) => {
            await axios.post('https://vanopoizonserver.ru/vanopoizon/addToFavorites',
                {
                    tg: tg?.initData,
                    userId,
                    spuId: elem.spuId,
                    photoUrl: elem.photoUrl,
                    title: elem.title,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    console.log('ok: ', response.data)
                })
                .catch(error => {
                    console.error('Ошибка')
                })
        }

        fetchAddToFavorites(userId);

        return { favorites: [...state.products, product] }
    }),
    removeFromFavorites: (elemId, userId) => set(state => {
        let tg = window?.Telegram?.WebApp;

        const fetchRemovefromFavorites = async (userId) => {
            await axios.post('https://vanopoizonserver.ru/vanopoizon/removeFromFavorites',
                {
                    tg: tg?.initData,
                    userId,
                    spuId: elemId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    console.log('ok: ', response.data)
                })
                .catch(error => {
                    console.error('Ошибка')
                })
        }

        fetchRemovefromFavorites(userId);

        return {
            favorites: [
                ...state.products.filter((elem) => elem.spuId != elemId)
            ]
        }
    }),
}));