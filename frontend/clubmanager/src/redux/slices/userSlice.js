import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    clubId: null,
  },
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.clubId = action.payload.clubId;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setClubId(state, action) {
      state.clubId = action.payload;
    },
    clearUser(state) {
      state.userId = null;
      state.clubId = null;
    },
  },
});

export const { setUser, setUserId, setClubId, clearUser } = userSlice.actions;
export default userSlice.reducer;
