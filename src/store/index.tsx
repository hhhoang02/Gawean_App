import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import productReducer from "./product";
import profileReducer from "./profile";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    profile: profileReducer,
  }
});

export default store;
