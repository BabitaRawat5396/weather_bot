import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  frequencies: [],
  loading: false,
};

const frequencySlice = createSlice({
  name: "frequency",
  initialState: initialState,
  reducers: {
    setFrequency(state, action) {
      state.frequencies = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setFrequency, setLoading } = frequencySlice.actions;

export default frequencySlice.reducer;
