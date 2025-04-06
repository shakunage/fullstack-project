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
  initialState: { username: false, status: "idle", tokenInvalid: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.username = action.payload;
        state.tokenInvalid = false;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        if (action.error.message === "Request failed with status code 401") {
          state.tokenInvalid = true;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.username = true;
        state.tokenInvalid = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = false;
        state.tokenInvalid = false;
      });
  },
});

export default authSlice.reducer;
