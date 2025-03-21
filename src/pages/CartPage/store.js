import { create } from "zustand";
import axios from "axios";

export const useCart = create((set) => ({
    cart: [],
    spuIds: [],

    usePoints: false,
    useInsurance: false,

    deliveryDataIsFilled: false,
    isLoading: false,

    toggleUseInsurance: () => set(state => {
        return { useInsurance: !state.useInsurance }
    }),
    setDeliveryDataIsFilled: (value) => set(state => {
        return { deliveryDataIsFilled: value }
    }),
    toggleUsePoints: () => set(state => {
        return { usePoints: !state.usePoints }
    }),
    setIsLoading: (value) => set(() => {
        return { isLoading: value }
    }),


    setSpuIds: (value) => set(() => {
        return { spuIds: value }
    }),
    setCart: (value) => set(() => {
        return { cart: value }
    }),

    removeFromCart: (elemId, size, color, userId) => set(state => {
        let tg = window?.Telegram?.WebApp;

        const props = { tg: tg?.initData, userId, spuId: elemId };

        if (size) props.size = size;
        if (color) props.color = color;

        const fetchRemovefromCart = async (userId) => {
            await axios.post('https://vanopoizonserver.ru/vanopoizon/removeFromCart',
                // {
                //     tg: tg?.initData,
                //     userId,
                //     spuId: elemId,
                //     size: size,
                //     color: color
                // },
                props,
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

        fetchRemovefromCart(userId);

        return { spuIds: [...state.spuIds.filter((elem) => (elem.spuId !== elemId && elem?.color !== color && elem?.size !== size))] }
    }),
    addToCart: (elem, userId) => set(state => {
        let tg = window?.Telegram?.WebApp;

        const fetchAddToCart = async (userId) => {
            await axios.post('https://vanopoizonserver.ru/vanopoizon/addToCart',
                {
                    tg: tg?.initData,
                    userId,
                    spuId: elem.spuId,
                    color: elem?.color,
                    count: elem.count,
                    size: elem?.size,
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

        fetchAddToCart(userId);

        return { spuIds: [...state.spuIds, elem] }
    }),

    setProductCount: (elem, value, userId) => set(state => {
        let tg = window?.Telegram?.WebApp;

        const fetchAddToCart = async (userId) => {
            await axios.post('https://vanopoizonserver.ru/vanopoizon/addToCart',
                {
                    tg: tg?.initData,
                    userId,
                    spuId: elem.spuId,
                    color: elem?.color,
                    count: value,
                    size: elem?.size,
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

        let newArr = state.spuIds.map(product =>
            product.spuId == elem.spuId ? { ...product, count: value } : product
        );

        fetchAddToCart(userId);

        return { spuIds: newArr }
    }),
}));