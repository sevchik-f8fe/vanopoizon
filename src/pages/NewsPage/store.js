import { create } from "zustand";

export const useArticles = create((set) => ({
    articles: [],
    setArticles: (data) => set(() => {
        return { articles: data };
    }),
}));