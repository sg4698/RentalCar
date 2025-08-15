import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// GET profile
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/users/profile");
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// UPDATE profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.put("/users/updateProfile", formData);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (
    { page = 1, limit = 6, role = "", search = "", status },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get(`/users/getusers`, {
        params: { page, limit, role, search, status },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "Failed to fetch users"
      );
    }
  }
);

// ✅ Thunk to update user activation status
export const updateUserStatus = createAsyncThunk(
  "users/updateUserStatus",
  async ({ userId, status, reason }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.patch(`/users/status/${userId}`, {
        status,
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
    updateSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getPRofile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UpdateProfile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      })

      // Fetch AllUser for Admin
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
      // UpdateAllUser For Admin
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
