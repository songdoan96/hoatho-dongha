import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  role: "ADMIN" | "PL" | "HT" | "KCS" | null;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  role: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string | null; role: "ADMIN" | "PL" | "HT" | "KCS" | null }>
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
