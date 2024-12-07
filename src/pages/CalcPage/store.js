import { create } from "zustand"

export const useCalc = create((set) => ({
    'size': {
        value: '',
        error: { text: '', isError: false },
    },
    'link': {
        value: '',
        error: { text: '', isError: false },
    },
    nextButtonLoading: true,
    setNextButtonLoading: (value) => set((state) => {
        return { nextButtonLoading: value };
    }),
    setSize: (value) => set((state) => {
        return { size: { error: { ...state.size.error, isError: false }, value: value.replace(/[^0-9.]/g, '') } };
    }),
    setLink: (value) => set((state) => {
        return { link: { error: { ...state.link.error, isError: false }, value } };
    }),
    setFieldError: (field, error) => set((state) => {
        return { [field]: { ...state[field], error: { isError: true, text: error } } };
    }),
}))