import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ToastState {
  show: boolean;
  type: "success" | "info" | "warning" | "error";
  message: string;
}

const initialState: ToastState = {
  show: false,
  type: "success",
  message: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; type?: "success" | "info" | "warning" | "error" }>
    ) => {
      state.show = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
    },
    hideToast: (state) => {
      state.show = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
const ToastReducer = toastSlice.reducer;
export default ToastReducer;
