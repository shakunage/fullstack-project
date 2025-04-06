import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuthStatus, logoutUser } from "../services/authApi";

export const fetchStatus = createAsyncThunk("backend/authcheck", async () => {
  return await checkAuthStatus();
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
      .addCase(logout.fulfilled, (state) => {
        state.username = false;
        
      });
  },
});

export default authSlice.reducer;
