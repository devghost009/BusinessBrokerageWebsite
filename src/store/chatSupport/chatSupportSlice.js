import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  user: null,
  room: null,
};

const chatSuppportSlice = createSlice({
  name: "chatSuppportSlice",
  initialState,
  //   reducer needs a map
  reducers: {
    saveSupportChatUserData(state, action) {
      state.user = action.payload.data.user;
      state.accessToken = action.payload.data.token;
      state.room = action.payload.data.room;
    },
    // updateUser(state, action) {
    //   state.user = action.payload;
    // },
    // signOutRequest(state) {
    //   state.accessToken = "";
    //   state.isLogin = false;
    //   state.user = null;
    // }
  },
});

export const { saveSupportChatUserData } = chatSuppportSlice.actions;

export default chatSuppportSlice.reducer;
