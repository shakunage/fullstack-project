import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuthStatus, loginUser, logoutUser } from "../services/authApi";

export const fetchStatus = createAsyncThunk("backend/authcheck", async () => {
  return await checkAuthStatus();
});

export const login = createAsyncThunk("backend/login", async () => {
  return await loginUser();
});

export const logout = createAsyncThunk("backend/logout", async () => {
  await logoutUser();
});

const authSlice = createSlice({
  name: "auth",
  initialState: { username: false, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.username = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.username = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = false;
      });
  },
});

export default authSlice.reducer;
