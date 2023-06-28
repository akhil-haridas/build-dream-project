// clientRoutes.js
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { professionalActions } from "store/professionalAuth";

import Login from "pages/professionals/Login";
import Signup from "pages/professionals/Signup";
import Home from "pages/professionals/Home";
import NotFound from "pages/NotFound";
import Subscription from "pages/professionals/Subscription";
import Myaccount from "pages/professionals/Myaccount";
import Works from "pages/professionals/Works";
import Work from "pages/professionals/Work";
import ActiveSubs from "pages/professionals/ActiveSubs";
import Chat from "pages/professionals/Chat";
import Addwork from "pages/professionals/Addwork";
import Magazines from "pages/professionals/Magazines";
import Magazine from "pages/professionals/Magazine";
import AddMagazine from "pages/professionals/AddMagazine";

const ProfessionalRoutes = () => {
  const [cookies] = useCookies(["jwt"]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(cookies).length > 0) {
      const { name, token, role,id } = cookies.jwt;
      if (role === "PROFESSIONAL") {
        dispatch(
          professionalActions.professionalAddDetails({ name, token, role ,id})
        );
      }
    }
  }, []);

  const user = useSelector((state) => state?.professional?.professionalRole);

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          user == "PROFESSIONAL" ? (
            <Home />
          ) : (
            <Navigate to={"/professional/login"} />
          )
        }
      />

      <Route
        path="/login"
        exact
        element={
          user == "PROFESSIONAL" ? <Navigate to={"/professional"} /> : <Login />
        }
      />

      <Route
        path="/signup"
        exact
        element={
          user == "PROFESSIONAL" ? (
            <Navigate to={"/professional"} />
          ) : (
            <Signup />
          )
        }
      />
      <Route path="/subscription/:id" exact element={<Subscription />} />
      <Route
        path="/myaccount"
        exact
        element={
          user == "PROFESSIONAL" ? (
            <Myaccount />
          ) : (
            <Navigate to={"/professional/login"} />
          )
        }
      />
      <Route
        path="/works"
        exact
        element={
          user == "PROFESSIONAL" ? (
            <Works />
          ) : (
            <Navigate to={"/professional/login"} />
          )
        }
      />
      <Route
        path="/works/:id"
        exact
        element={
          user == "PROFESSIONAL" ? (
            <Work />
          ) : (
            <Navigate to={"/professional/login"} />
          )
        }
      />
      <Route
        path="/activeplan"
        exact
        element={
          user == "PROFESSIONAL" ? (
            <ActiveSubs />
          ) : (
            <Navigate to={"/professional/login"} />
          )
        }
      />
      <Route
        path="/chat"
        exact
        element={user == "PROFESSIONAL" ? <Chat /> : <Navigate to={"/"} />}
      />
      <Route
        path="/works/addwork"
        exact
        element={user == "PROFESSIONAL" ? <Addwork /> : <Navigate to={"/"} />}
      />
      <Route
        path="/magazines"
        exact
        element={
          user == "PROFESSIONAL" ? (
            <Magazines />
          ) : (
            <Navigate to={"/professional/login"} />
          )
        }
      />
      <Route
        path="/magazines/:id"
        exact
        element={
          user == "PROFESSIONAL" ? (
            <Magazine/>
          ) : (
            <Navigate to={"/professional/login"} />
          )
        }
      />
      <Route
        path="/magazines/addmagazine"
        exact
        element={user == "PROFESSIONAL" ? <AddMagazine /> : <Navigate to={"/"} />}
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default ProfessionalRoutes;
