import { create } from "zustand";

export const useOrders = create((set, get) => ({
    orders: [
        { orderId: '1231242123', deliveryType: 'в пункт выдачи', address: '112431 Россия, Новгородская обл., г. Пестово, ул. Титова, д. 14', date: '17.03.24', isMark: false, status: 'atView', label: 'На проверке', products: [{ photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzn2obKjiGY1487Y1rHe4Ss-qA_UdZ6uPv0g&s', price: 12000 }], },
        { orderId: '2231242123', deliveryType: 'в пункт выдачи', address: '112431 Россия, Новгородская обл., г. Пестово, ул. Титова, д. 14', date: '18.03.24', isMark: false, status: 'done', label: 'Завершён', products: [{ photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }] },
        { orderId: '3231242123', deliveryType: 'курьером', address: '112431 Россия, Новгородская обл., г. Пестово, ул. Титова, д. 14', date: '19.03.24', isMark: false, status: 'readyForDone', label: 'Готов к выдаче', products: [{ photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }, { title: 'Nike Air Pro 1', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }, { title: 'Nike Air Pro 1', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }, { title: 'Nike Air Pro 1', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }], },
        { orderId: '4231242123', deliveryType: 'в пункт выдачи', address: '112431 Россия, Новгородская обл., г. Пестово, ул. Титова, д. 14', date: '20.03.24', isMark: true, status: 'onWay', label: 'Прибыл в город', title: 'Nike Air Pro 4', products: [{ photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGttnSM3pYegHDkXMAK6UxK25cHXrfH8_Jig&s', price: 12000 }] }
    ],
    showDone: false,
    addOrders: (value) => set(state => {
        return { orders: [...state.orders, ...value] };
    }),
    setShowDone: (value) => set(state => {
        return { showDone: value }
    }),
}));