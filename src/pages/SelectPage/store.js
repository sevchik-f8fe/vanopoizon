import { create } from "zustand";

export const useSelectPage = create((set) => ({
    value: '',
    setFieldValue: (value) => set((state) => {
        return { value: value }
    })
}))