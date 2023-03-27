import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  allDevices: [],
  setEditId: null,
  editDevice: {},
  loading: false,
  errorMsg: undefined,
};

export const getDevices = createAsyncThunk(
  "devices/getDevices",
  async (token) => {
    const res = await fetch("/api/device/", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .catch((err) => err);
    return res;
  }
);

export const editDevice = createAsyncThunk(
  "devices/editDevices",
  async (data) => {
    const res = await fetch(`/api/device/${data.id}`, {
      method: "PUT",
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

export const addDevice = createAsyncThunk(
  "devices/addDevices",
  async (data) => {
    const res = await fetch("/api/device/", {
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

export const deleteDevice = createAsyncThunk(
  "devices/deleteDevices",
  async (data) => {
    const res = await fetch(`/api/device/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.token}`,
      },
    })
      .then((data) => data.json())
      .catch((err) => err);
    return res;
  }
);

export const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
  },
  extraReducers: {
    [getDevices.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getDevices.pending]: (state) => {
      state.loading = true;
    },
    [getDevices.fulfilled]: (state, action) => {
      state.loading = false;
      state.allDevices = action.payload.data;
    },
    [editDevice.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [editDevice.pending]: (state) => {
      state.loading = true;
    },
    [editDevice.fulfilled]: (state) => {
      state.loading = false;
    },
    [addDevice.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [addDevice.pending]: (state) => {
      state.loading = true;
    },
    [addDevice.fulfilled]: (state) => {
      state.loading = false;
    },
    [deleteDevice.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [deleteDevice.pending]: (state) => {
      state.loading = true;
    },
    [deleteDevice.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export const devicesReducer = devicesSlice.reducer;