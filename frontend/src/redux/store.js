import { configureStore } from "@reduxjs/toolkit";
import { createAccountReducer } from "./createAccountSlice";
import { devicesReducer } from "./devicesSlice";
import { loginReducer } from "./loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    createAccount: createAccountReducer,
    devices: devicesReducer,
  },
});
