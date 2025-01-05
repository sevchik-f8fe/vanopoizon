import { create } from "zustand"

export const useCalc = create((set) => ({
    'link': {
        value: '',
        error: { text: '', isError: false },
    },
    nextButtonLoading: false,
    setNextButtonLoading: (value) => set((state) => {
        return { nextButtonLoading: value };
    }),
    setLink: (value) => set((state) => {
        return { link: { error: { ...state.link.error, isError: false }, value } };
    }),
    setFieldError: (field, error) => set((state) => {
        return { [field]: { ...state[field], error: { isError: true, text: error } } };
    }),
}))