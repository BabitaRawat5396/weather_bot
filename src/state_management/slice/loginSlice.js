import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setUser, setLoading, setToken } = loginSlice.actions;

export default loginSlice.reducer;
