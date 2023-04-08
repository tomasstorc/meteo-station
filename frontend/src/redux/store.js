import { configureStore } from "@reduxjs/toolkit";
import { createAccountReducer } from "./createAccountSlice";
import { dataReducer } from "./dataSlice";
import { devicesReducer } from "./devicesSlice";
import { loginReducer } from "./loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    createAccount: createAccountReducer,
    devices: devicesReducer,
    data: dataReducer,
  },
});
