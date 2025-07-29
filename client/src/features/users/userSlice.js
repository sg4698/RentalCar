import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";

// Async thunk to fetch all users (excluding admin)
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ page = 1, limit = 6, role = "", search = "" }, { rejectWithValue }) => {
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

// ✅ Thunk to update user activation status
export const updateUserStatus = createAsyncThunk(
  "users/updateUserStatus",
  async ({ userId, isActive, reason }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/auth/status/${userId}`, {
        isActive,
        reason,
      });
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
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
      })

      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user status";
      });
  },
});

export default userSlice.reducer;
