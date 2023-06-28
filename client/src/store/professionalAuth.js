import { createSlice } from "@reduxjs/toolkit";

const professionalAuth = createSlice({
  name: "professional",
  initialState: {
    professionalToken: null,
    professionalName: null,
    professionalRole: null,
    professionalID : null
  },
  reducers: {
    professionalAddDetails(state, actions) {
      const newitem = actions.payload;
      state.professionalName = newitem.name;
      state.professionalToken = newitem.token;
      state.professionalRole = newitem.role;
      state.professionalID = newitem.id
    },
    professionalLogout(state, actions) {
      state.professionalName = "";
      state.professionalToken = "";
      state.professionalRole = "";
      state.professionalID = ""
    },
  },
});

export const professionalActions = professionalAuth.actions;

export default professionalAuth;
