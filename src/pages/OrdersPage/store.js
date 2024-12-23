import { create } from "zustand";

export const useOrders = create((set, get) => ({
    orders: [
        { orderId: '1231242123', deliveryType: 'в пункт выдачи', date: '17.03.24', isMark: false, status: 'на рассмотрении', products: [{ photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }, { title: 'Nike Air Pro 1', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }], },
        { orderId: '2231242123', deliveryType: 'в пункт выдачи', date: '18.03.24', isMark: false, status: 'завершён', products: [{ photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }] },
        { orderId: '3231242123', deliveryType: 'курьером', date: '19.03.24', isMark: false, status: 'готов к выдаче', products: [{ photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }, { title: 'Nike Air Pro 1', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }, { title: 'Nike Air Pro 1', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }, { title: 'Nike Air Pro 1', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }], },
        { orderId: '4231242123', deliveryType: 'в пункт выдачи', date: '20.03.24', isMark: true, status: 'завершён', title: 'Nike Air Pro 4', products: [] }
    ],
    page: 0,
    showDone: false,
    setOrders: (value) => set(state => {
        return { orders: value };
    }),
    addOrders: (value) => set(state => {
        return { orders: [...state.orders, ...value] };
    }),
    setPage: (value) => set(state => {
        return { page: value }
    }),
    setShowDone: (value) => set(state => {
        return { showDone: value }
    }),
}));