import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";

// Async thunk to fetch all users (excluding admin)
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ page = 1, limit = 10, role = "", search = "" }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/auth/users`, {
        params: { page, limit, role, search },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to fetch users");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    totalPages: 0,
    totalUsers: 0,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
