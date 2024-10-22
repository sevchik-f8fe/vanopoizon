import { create } from "zustand";

export const useSelectPage = create((set) => ({
    value: '',
    setValue: (value) => set((state) => {
        return { value: value }
    })
}))