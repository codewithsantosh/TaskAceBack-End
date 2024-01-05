import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApi = createAsyncThunk("fetchApi", async () => {
  try {
    const response = await axios.get("http://localhost:5000/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

const apiSlice = createSlice({
  name: "api",
  initialState: {
    isLoader: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApi.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchApi.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchApi.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export default apiSlice.reducer;
