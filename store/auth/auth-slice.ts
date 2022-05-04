import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { signup, login, logout, getProfile } from "./side-effects";

const initialState = {
  isAuthed: false,
  loading: false,
  user: {
    uid: "",
    name: "",
    avatar: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsAuthed: (state, action: PayloadAction<boolean>) => {
      state.isAuthed = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<{
        userData: { uid: string; name: string; avatar: string };
      }>
    ) => {
      state.user = action.payload.userData;
    },
  },
  extraReducers: (builder) => {
    // signup reducers
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user.uid = action.payload.uid;
        state.user.name = action.payload.name;
        state.user.avatar = action.payload.avatar;
        state.isAuthed = true;
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      });

    // login reducers
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user.uid = action.payload.uid;
        state.user.name = action.payload.name;
        state.user.avatar = action.payload.avatar;
        state.isAuthed = true;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });

    // logout reducer
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthed = false;
      state.user = initialState.user;
    });

    // user profile reducers
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user.uid = action.payload.uid;
        state.user.name = action.payload.name;
        state.user.avatar = action.payload.avatar;
        state.loading = false;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

const authActions = authSlice.actions;

export { authActions };
export default authSlice.reducer;
