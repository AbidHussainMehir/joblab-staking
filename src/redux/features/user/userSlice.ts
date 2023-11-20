import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export interface UserState {
  isLogged: boolean;
  role?: string;
  email?: string;
  user?: any;
  token?: any;
}

const initialState: UserState = {
  isLogged: cookies.get("accessToken") ? true : false,
  email: "",
  user: null,
  token: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogged: (state: UserState, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setEmail: (state: UserState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setToken: (state: UserState, action: any) => {
      state.token = action.payload;
    },
    setUser: (state: UserState, action: any) => {
      state.user = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setIsLogged, setEmail ,setToken,setUser} = userSlice.actions;

export default userSlice.reducer;
