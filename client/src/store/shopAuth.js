import { createSlice } from "@reduxjs/toolkit";

const shopAuth = createSlice({
  name: "shop",
  initialState: {
    shopToken: null,
    shopName: null,
    shopRole: null,
    shopID:null
  },
  reducers: {
    shopAddDetails(state, actions) {
      const newitem = actions.payload;
      state.shopName = newitem.name;
      state.shopToken = newitem.token;
      state.shopRole = newitem.role;
      state.shopID = newitem.id
    },
    shopLogout(state, actions) {
      state.shopName = "";
      state.shopToken = "";
      state.shopRole = "";
      state.shopID = ""
    },
  },
});

export const shopActions = shopAuth.actions;

export default shopAuth;
