import { create } from "zustand"

export const useCalc = create((set) => ({
    size: '',
    link: '',
    setSize: (value) => set((state) => {
        return { size: value.replace(/[^0-9.]/g, '') };
    }),
    setLink: (value) => set((state) => {
        console.log(state.link)
        return { link: value };
    }),
}))