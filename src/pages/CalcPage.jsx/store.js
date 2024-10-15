import { create } from "zustand"

export const useCalc = create((set) => ({
    page: 0,
    nextPage: () => set((state) => {
        console.log(state.page);
        return state.page < 3 ? { page: state.page + 1 } : { page: state.page };
    }),
    prevPage: () => set((state) => {
        console.log(state.page);
        return state.page > 0 ? { page: state.page - 1 } : { page: state.page };
    }),
    setPage: (value) => set(() => ({ page: value })),
}))