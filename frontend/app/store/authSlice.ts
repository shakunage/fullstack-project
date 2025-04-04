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
  initialState: { isLoggedIn: false, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
