import { createSlice } from "@reduxjs/toolkit";

const clientAuth = createSlice({
  name: "user",
  initialState: {
    userToken: null,
    userName: null,
    userRole: null,
    userID:null
  },
  reducers: {
    clientAddDetails(state, actions) {
      const newitem = actions.payload;
      state.userName = newitem.name;
      state.userToken = newitem.token;
      state.userRole = newitem.role;
      state.userID = newitem.id;
    },
    clientLogout(state, actions) {
      state.userName = "";
      state.userToken = "";
      state.userRole = "";
      state.userID = ""
    },
  },
});

export const clientActions = clientAuth.actions;

export default clientAuth;
