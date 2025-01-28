import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    clubId: null,
    isPaymentEnabled: false,
  },
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.clubId = action.payload.clubId;
      state.isPaymentEnabled = action.payload.isPaymentEnabled;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setClubId(state, action) {
      state.clubId = action.payload;
    },
    setIsPaymentEnabled(state, action) {
      state.isPaymentEnabled = action.payload;
    },
    clearUser(state) {
      state.userId = null;
      state.clubId = null;
      state.isPaymentEnabled = false;
    },
  },
});

export const { setUser, setUserId, setClubId, setIsPaymentEnabled, clearUser } = userSlice.actions;
export default userSlice.reducer;
