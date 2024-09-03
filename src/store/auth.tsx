import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwt: null,
    profile: null,
  },
  reducers: {
    setJwt(state, action) {
      state.jwt = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setJwt, setProfile } = authSlice.actions;
export default authSlice.reducer;
