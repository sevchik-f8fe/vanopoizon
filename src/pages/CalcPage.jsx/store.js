import { create } from "zustand"

export const useCalc = create((set) => ({
    page: 0,
    size: '',
    link: '',
    nextPage: () => set((state) => {
        return state.page < 3 ? { page: state.page + 1 } : { page: state.page };
    }),
    prevPage: () => set((state) => {
        return state.page > 0 ? { page: state.page - 1 } : { page: state.page };
    }),
    setSize: (value) => set((state) => {
        return { size: value.replace(/[^0-9.]/g, '') };
    }),
    setLink: (value) => set((state) => {
        console.log(state.link)
        return { link: value };
    }),
    setPage: (value) => set(() => ({ page: value })),
}))