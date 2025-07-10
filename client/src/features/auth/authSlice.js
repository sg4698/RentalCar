import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';



export const registerUser = createAsyncThunk('auth/register',async(userData,thunkAPI) => {
  try {
    const res = await axiosInstance.post('/auth/register',userData);
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration Failed')
  }
});



export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/auth/login', userData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    email: null,
    name : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.email = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = true;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;