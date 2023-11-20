import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NavbarState {
  isOpen: boolean;
  searchText: string;
  company: boolean;
  category: string;
}

const initialState: NavbarState = {
  isOpen: false,
  searchText: "",
  company: false,
  category: "All",
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setIsOpen: (state: NavbarState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setSearchText: (state: NavbarState, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.company = false;
    },
    setCompanyName: (state: NavbarState, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.company = true;
    },
    setCategory: (state: NavbarState, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setIsOpen, setSearchText, setCompanyName, setCategory } =
  navbarSlice.actions;

export default navbarSlice.reducer;
