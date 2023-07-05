// clientRoutes.js
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { adminActions } from "store/adminAuth";

import Dashboard from "pages/admin/Dashboard";
import Login from "pages/admin/Login";
import Permissions from "pages/admin/Permissions";
import Categories from "pages/admin/Categories";
import AddCategory from "pages/admin/AddCategory";
import Clients from "pages/admin/Clients";
import ClientProfile from "pages/admin/ClientProfile";
import Professionals from "pages/admin/Professionals";
import Shops from "pages/admin/Shops";
import ShopProfile from "pages/admin/ShopProfile";
import ProfessionalProfile from "pages/admin/ProfessionalProfile";
import NotFound from "pages/NotFound";
import Subscriptions from "pages/admin/Subscriptions";

const AdminRoutes = () => {
  const [cookies] = useCookies(["jwt"]);
  const dispatch = useDispatch();

  useEffect(() => {
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (role === "ADMIN") {
      dispatch(adminActions.adminAddDetails({ name, token, role }));
    }
  }, []);

  const user = useSelector((state) => state?.admin?.adminToken);
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={user ? <Dashboard /> : <Navigate to={"/admin/login"} />}
      />

      <Route
        path="/login"
        exact
        element={user ? <Navigate to={"/admin"} /> : <Login />}
      />

      <Route
        path="/permissions"
        element={user ? <Permissions /> : <Navigate to={"/admin/login"} />}
      />
      <Route
        path="/categories"
        element={user ? <Categories /> : <Navigate to={"/admin/login"} />}
      />
      <Route
        path="/categories/addcategory"
        element={user ? <AddCategory /> : <Navigate to={"/admin/login"} />}
      />
      <Route
        path="/clients"
        element={user ? <Clients /> : <Navigate to={"/admin/login"} />}
      />
      <Route
        path="/professionals"
        element={user ? <Professionals /> : <Navigate to={"/admin/login"} />}
      />
      <Route
        path="/shops"
        element={user ? <Shops /> : <Navigate to={"/admin/login"} />}
      />
      <Route
        path="/clients/:id"
        element={user ? <ClientProfile /> : <Navigate to={"/admin/login"} />}
      />
      <Route
        path="/professionals/:id"
        element={
          user ? <ProfessionalProfile /> : <Navigate to={"/admin/login"} />
        }
      />
      <Route
        path="/shops/:id"
        element={user ? <ShopProfile /> : <Navigate to={"/admin/login"} />}
      />
      <Route
        path="/subscriptions"
        exact
        element={user ? <Subscriptions /> : <Navigate to={"/admin/login"} />}
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
