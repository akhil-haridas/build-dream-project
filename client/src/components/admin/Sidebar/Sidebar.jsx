import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { adminActions } from "store/adminAuth";

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
  const logout = () => {
    removeCookie("jwt");
    dispatch(adminActions.adminLogout());
    navigate("/admin/login");
  };
  return (
    <section id="sidebar">
      <a className="brand">
        <i className="bx bxs-smile" />
        <span className="text">Welcome, A D M I N</span>
      </a>
      <ul className="side-menu top">
        <li className={active == "Dashboard" ? "active" : ""}>
          <a onClick={() => navigate("/admin")}>
            <i className="bx bxs-dashboard" />
            <span className="text">Dashboard</span>
          </a>
        </li>
        <li className={active == "Magazines" ? "active" : ""}>
          <a>
            <i class="bx bxs-book-reader"></i>
            <span className="text">Magazines</span>
          </a>
        </li>
        <li className={active == "Permissions" ? "active" : ""}>
          <a onClick={() => navigate("/admin/permissions")}>
            <i class="bx bx-block"></i>
            <span className="text">Permissions</span>
          </a>
        </li>
        <li className={active == "Professionals" ? "active" : ""}>
          <a onClick={() => navigate("/admin/professionals")}>
            <i class="bx bxs-cog"></i>
            <span className="text">Professionals</span>
          </a>
        </li>
        <li className={active == "Shops" ? "active" : ""}>
          <a onClick={() => navigate("/admin/shops")}>
            <i class="bx bxs-business"></i>
            <span className="text">Shops</span>
          </a>
        </li>
        <li className={active == "Clients" ? "active" : ""}>
          <a onClick={() => navigate("/admin/clients")}>
            <i className="bx bxs-group" />
            <span className="text">Clients</span>
          </a>
        </li>

        <li className={active == "Subscriptions" ? "active" : ""}>
          <a onClick={() => navigate("/admin/subscriptions")}>
            <i className="bx bxs-category" />
            <span className="text">Subcriptions</span>
          </a>
        </li>
        <li className={active == "Category" ? "active" : ""}>
          <a onClick={() => navigate("/admin/categories")}>
            <i className="bx bxs-category" />
            <span className="text">Categories</span>
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a className="logout" onClick={logout}>
            <i className="bx bxs-log-out-circle" />
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
