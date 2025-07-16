import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axioInstance from "../../services/axiosInstance";

// ✅ Fetch pending cars
export const fetchPendingCars = createAsyncThunk("adminCar/fetchPending", async (_, thunkAPI) => {
  try {
    const res = await axioInstance.get("/cars/getPendingCars");
    return res.data.cars;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Fetch approved cars
export const fetchApprovedCars = createAsyncThunk("adminCar/fetchApproved", async (_, thunkAPI) => {
  try {
    const res = await axioInstance.get("/cars/approvedCars");
    return res.data.cars;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Fetch rejected cars
export const fetchRejectedCars = createAsyncThunk("adminCar/fetchRejected", async (_, thunkAPI) => {
  try {
    const res = await axioInstance.get("/cars/rejectedCars");
    return res.data.cars;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Approve car
export const approveCar = createAsyncThunk("adminCar/approve", async (id, thunkAPI) => {
  try {
    const res = await axioInstance.patch(`/cars/approve/${id}`);
    return res.data.car;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Reject car
export const rejectCar = createAsyncThunk("adminCar/reject", async ({ id, reason }, thunkAPI) => {
  try {
    const res = await axioInstance.patch(`/cars/reject/${id}`, { reason });
    return res.data.car;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const adminCarSlice = createSlice({
  name: "adminCar",
  initialState: {
    pending: [],
    approved: [],
    rejected: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending Cars
      .addCase(fetchPendingCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingCars.fulfilled, (state, action) => {
        state.loading = false;
        state.pending = action.payload;
      })
      .addCase(fetchPendingCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchApprovedCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovedCars.fulfilled, (state, action) => {
        state.loading = false;
        state.approved = action.payload; // ✅ Sets approved cars
      })
     .addCase(fetchApprovedCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Rejected Cars
      .addCase(fetchRejectedCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRejectedCars.fulfilled, (state, action) => {
        state.loading = false;
        state.rejected = action.payload;
      })
      .addCase(fetchRejectedCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Approve Car
      .addCase(approveCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveCar.fulfilled, (state, action) => {
        state.loading = false;
        state.pending = state.pending.filter((car) => car._id !== action.payload._id);
        state.approved.push(action.payload);
      })
      .addCase(approveCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reject Car
      .addCase(rejectCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectCar.fulfilled, (state, action) => {
        state.loading = false;
        state.pending = state.pending.filter((car) => car._id !== action.payload._id);
        state.rejected.push(action.payload);
      })
      .addCase(rejectCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminCarSlice.reducer;
