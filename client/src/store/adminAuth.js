import { createSlice } from "@reduxjs/toolkit";

const adminAuth = createSlice({
  name: "admin",
  initialState: {
    adminToken: null,
    adminName: null,
    adminRole: null,
  },
  reducers: {
    adminAddDetails(state, actions) {
      const newitem = actions.payload;
      state.adminName = newitem.name;
      state.adminToken = newitem.token;
      state.adminRole = newitem.role;
    },
    adminLogout(state, actions) {
      state.adminName = "";
      state.adminToken = "";
      state.adminRole = "";
    },
  },
});

export const adminActions = adminAuth.actions;

export default adminAuth;
