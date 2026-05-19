import { create } from "zustand";

const useFilterStore = create((set) => ({
  filter: "",

  // Action to update the filter string
  setFilter: (text) => set({ filter: text }),
}));

export default useFilterStore;
