import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slice/api";
export const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});
