// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../services/axiosInstance';



// export const registerUser = createAsyncThunk('auth/register',async(userData,thunkAPI) => {
//   try {
//     const res = await axiosInstance.post('/auth/register',userData);
//     return res.data
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration Failed')
//   }
// });



// export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
//   try {
//     const res = await axiosInstance.post('/auth/login', userData);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
//   }
// });

// export const getCurrentUser = createAsyncThunk(
//   'auth/getCurrentUser',
//   async (_, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get('/auth/me');
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue('Not authenticated',err);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//   try {
//     await axiosInstance.post('/auth/logout');
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     role: null,
//     email: null,
//     name : null,
//     loading: true,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.role = null;
//       state.email = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       //  Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = true;
//         state.role = action.payload.role;
//         state.email = action.payload.email;
//         state.name = action.payload.name;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.user = null;
//         state.error = action.payload;
//       })

//     builder
//       .addCase(getCurrentUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getCurrentUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = true;
//         state.name = action.payload.name;
//         state.email = action.payload.email;
//         state.role = action.payload.role;
//       })
//       .addCase(getCurrentUser.rejected, (state) => {
//         state.loading = false;
//         state.user = null;
//       })

//       // logout
//        .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.role = null;
//         state.name = null;
//         state.email = null;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

// Register User
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/auth/register', userData);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

// Login User
export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/auth/login', userData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// Get Current Logged-in User
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Not authenticated');
  }
});

// Logout User
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
});

const initialState = {
  user: null,
  role: null,
  email: null,
  name: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.email = null;
      state.name = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
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
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = true;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.role = null;
        state.email = null;
        state.name = null;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.role = null;
        state.email = null;
        state.name = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
