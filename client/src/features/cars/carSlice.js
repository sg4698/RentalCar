import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axioInstance from "../../services/axiosInstance";

// Create car
export const createCar = createAsyncThunk("car/createCar", async (formData) => {
  const res = await axioInstance.post("/cars/createCar", formData,{
    headers: {
          'Content-Type': 'multipart/form-data',
        },
        
  });
  return res.data.car;
});

// Fetch all cars
export const fetchCars = createAsyncThunk("car/fetchCars", async () => {
  const res = await axioInstance.get("/cars/getAllCars");
  return res.data.cars;
});
// Delete car
export const deleteCar = createAsyncThunk("/cars/deleteCar", async (carId) => {
  await axioInstance.delete(`/cars/${carId}`);
  return carId;
});
export const getMyCars = createAsyncThunk("car/getMyCars", async () => {
  const res = await axioInstance.get("/cars/my-cars");
  return res.data.cars;
});

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: [],
    myCars : [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      })
      .addCase(createCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  //  Get owner Cars
        .addCase(getMyCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyCars.fulfilled, (state, action) => {
        state.loading = false;
        state.myCars = action.payload;
      })
      .addCase(getMyCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car._id !== action.payload);
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default carSlice.reducer;
