import { create } from "zustand";

type FilterState = {
  categoryID: string;
  categoryName: string;
  isFillterOn: boolean;
  setCategoryID: (id: string, name: string) => void;
  setFilterOn: () => void;
  setFilterOff: () => void;
};

const useFilterState = create<FilterState>((set) => ({
  isFillterOn: false,
  categoryID: "",
  categoryName: "",
  setCategoryID: (id: string, name: string) =>
    set(() => {
      return { categoryID: id, categoryName: name };
    }),
  setFilterOn: () =>
    set(() => {
      return { isFillterOn: true };
    }),
  setFilterOff: () => {
    set(() => {
      return { categoryID: "", isFillterOn: false, categoryName: "" };
    });
  },
}));

export default useFilterState;
