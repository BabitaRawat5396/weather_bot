import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiKeys: [],
  loading: false,
};

const apiKeysSlice = createSlice({
  name: "apiKeys",
  initialState: initialState,
  reducers: {
    setApiKeys(state, action) {
      state.apiKeys = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setApiKeys, setLoading } = apiKeysSlice.actions;

export default apiKeysSlice.reducer;
