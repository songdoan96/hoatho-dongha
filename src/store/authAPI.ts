// import { createAsyncThunk } from "@reduxjs/toolkit";
// import http from "../utils/http";

import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/http";

// const fetchUserLogin = createAsyncThunk("auth/fetchUser", async (_, thunkAPI) => {
//   try {
//     await http.get("/auth/me");
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });
// export const fetchUser=fetchUserLogin;
// fetchTodoById is the "thunk action creator"

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await http.get("/auth/me");
  return response;
});
