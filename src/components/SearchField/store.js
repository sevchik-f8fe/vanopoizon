import { create } from "zustand";

export const useSearchField = create((set) => ({
    fieldValue: '',
    miniProductList: [],
    isTyping: false,
    setMiniProductList: (data) => set((state) => {
        return { miniProductList: data }
    }),
    setIsTyping: (value) => set((state) => {
        return { isTyping: value }
    }),
    setFieldValue: (value) => set((state) => {
        return { fieldValue: value }
    })
}))