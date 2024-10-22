import { create } from "zustand"

export const useCalc = create((set) => ({
    size: {
        value: '',
        error: null,
    },
    link: {
        value: '',
        error: null,
    },
    setSize: (value) => set((state) => {
        return { size: { value: value.replace(/[^0-9.]/g, '') } };
    }),
    setLink: (value) => set((state) => {
        return { link: { value } };
    }),
    setFieldError: (field, error) => set((state) => {
        return { [field]: { error } };
    }),
}))