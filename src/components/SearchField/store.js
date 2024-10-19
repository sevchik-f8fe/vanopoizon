import { create } from "zustand";

export const useSearchField = create((set) => ({
    fieldValue: '',
    setFieldValue: (value) => set((state) => {
        return { fieldValue: value }
    })
}))