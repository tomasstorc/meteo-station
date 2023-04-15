import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  errorMsg: undefined,
};

export const getData = createAsyncThunk("data/getData", async (data) => {
  const res = await fetch(
    `/api/data/${data.id}?granularity=${data.granularity}&dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${data.token}`,
      },
    }
  )
    .then((data) => data.json())
    .catch((err) => err);
  return res;
});

export const dataSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: {
    [getData.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getData.pending]: (state) => {
      state.loading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data.data;
    },
  },
});

export const dataReducer = dataSlice.reducer;
