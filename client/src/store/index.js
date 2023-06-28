import { configureStore } from "@reduxjs/toolkit";
import clientAuth from "./clientAuth";
import professionalAuth from "./professionalAuth";
import shopAuth from "./shopAuth";
import adminAuth from "./adminAuth";


const Store = configureStore({
  reducer: {
    user: clientAuth.reducer,
    professional: professionalAuth.reducer,
    admin: adminAuth.reducer,
    shop: shopAuth.reducer,
  },
});

export default Store;
