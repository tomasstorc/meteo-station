import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
};

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (data) => {
    const res = await fetch("/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.token}`,
      },

      body: JSON.stringify(data.body),
    })
      .then((data) => data.json())
      .catch((err) => err);
    return res;
  }
);

export const createAccountSlice = createSlice({
  name: "createAccount",
  initialState,
  reducers: {},
  extraReducers: {
    [createAccount.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [createAccount.pending]: (state) => {
      state.loading = true;
    },
    [createAccount.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload.data) {
        state.loading = false;
      } else {
        state.error = true;
        state.errorMsg = action.payload.errorMsg;
      }
    },
  },
});

export const createAccountReducer = createAccountSlice.reducer;
