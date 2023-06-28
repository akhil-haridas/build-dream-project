// clientRoutes.js
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clientActions } from "store/clientAuth";

import Landing from "pages/clients/LandingPage";
import Login from "pages/clients/Login";
import Role from "pages/clients/Role";
import Signup from "pages/clients/Signup";
import Professionals from "pages/clients/Professionals";
import DetailProfile from "pages/clients/ProfessionalProfile.jsx";
import Shops from "pages/clients/Shops";
import ShopProfile from "pages/clients/ShopProfile";
import ForgotPassword from "pages/clients/ForgotPassword";
import NotFound from "pages/NotFound";
import Chat from "pages/clients/Chat";
import Magazines from "pages/clients/Magazines";

const ClientRoutes = () => {
  const [cookies] = useCookies(["jwt"]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(cookies).length > 0) {
      const { name, token, role, id } = cookies.jwt;
      if (role === "CLIENT") {
        dispatch(clientActions.clientAddDetails({ name, token, role, id }));
      }
    }
  }, []);

  const user = useSelector((state) => {
    return state?.user?.userToken;
  });

  return (
    <Routes>
      <Route path="/" exact element={<Landing />} />

      <Route
        path="/login"
        exact
        element={user ? <Navigate to={"/"} /> : <Login />}
      />

      <Route
        path="/signup"
        exact
        element={user ? <Navigate to={"/"} /> : <Role />}
      />
      <Route
        path="/forgotpassword"
        exact
        element={user ? <Navigate to={"/"} /> : <ForgotPassword />}
      />

      <Route path="/signup/client" exact element={<Signup />} />
      <Route path="/professionals" exact element={<Professionals />} />
      <Route path="/professionals/:id" element={<DetailProfile />} />
      <Route path="/shops" exact element={<Shops />} />
      <Route path="/shops/:id" exact element={<ShopProfile />} />
      <Route
        path="/chat"
        exact
        element={user ? <Chat /> : <Navigate to={"/"} />}
      />
      <Route path="/magazines" exact element={<Magazines/> } />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default ClientRoutes;
