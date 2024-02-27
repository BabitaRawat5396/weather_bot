import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUsers, setLoading } = adminSlice.actions;

export default adminSlice.reducer;
