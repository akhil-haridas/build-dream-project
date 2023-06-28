// clientRoutes.js
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { shopActions } from "store/shopAuth";

import Home from "pages/shops/Home";
import Signup from "pages/shops/Signup";
import Login from "pages/shops/Login";
import NotFound from "pages/NotFound";
import Subscription from "pages/shops/Subscription";
import Myaccount from "pages/shops/Myaccount";
import Products from "pages/shops/Products";
import Product from "pages/shops/Product";
import ActiveSubs from "pages/shops/ActiveSubs";
import Chat from "pages/shops/Chat";
import Addproduct from "pages/shops/Addproduct";

const ShopRoutes = () => {
  const [cookies] = useCookies(["jwt"]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(cookies).length > 0) {
      console.log(cookies,'cook')
      dispatch(
        shopActions.shopAddDetails({
          name: cookies.jwt.name,
          token: cookies.jwt.token,
          role: cookies.jwt.role,
          id:cookies.jwt.id
        })
      );
    }
  }, []);

  const user = useSelector((state) => state?.shop?.shopRole);

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={user === "SHOP" ? <Home /> : <Navigate to={"/shop/login"} />}
      />

      <Route
        path="/login"
        exact
        element={user === "SHOP" ? <Navigate to={"/shop"} /> : <Login />}
      />

      <Route
        path="/signup"
        exact
        element={user === "SHOP" ? <Navigate to={"/shop"} /> : <Signup />}
      />
      <Route path="/subscription/:id" exact element={<Subscription />} />
      <Route
        path="/myaccount"
        element={
          user === "SHOP" ? <Myaccount /> : <Navigate to={"/shop/login"} />
        }
      />
      <Route
        path="/products"
        exact
        element={
          user === "SHOP" ? <Products /> : <Navigate to={"/shop/login"} />
        }
      />
      <Route
        path="/products/:id"
        exact
        element={
          user === "SHOP" ? <Product /> : <Navigate to={"/shop/login"} />
        }
      />
      <Route
        path="/activeplan"
        exact
        element={
          user === "SHOP" ? <ActiveSubs /> : <Navigate to={"/shop/login"} />
        }
      />
      <Route
        path="/chat"
        exact
        element={user === "SHOP" ? <Chat /> : <Navigate to={"/"} />}
      />

      <Route
        path="/products/addproduct"
        exact
        element={user == "SHOP" ? <Addproduct /> : <Navigate to={"/"} />}
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default ShopRoutes;
