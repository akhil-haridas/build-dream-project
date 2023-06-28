import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { shopActions } from "store/shopAuth";
const Sidebar = ({ active }) => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector((state)=> state.shop.shopName)
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
  const logout = () => {
    removeCookie("jwt");
    dispatch(shopActions.shopLogout());
    navigate("/shop/login");
  };
  return (
    <section id="sidebar">
      <a className="brand">
        <i className="bx bxs-smile" />
        <span className="text">Welcome, {userName}</span>
      </a>
      <ul className="side-menu top">
        <li className={active == "Home" ? "active" : ""}>
          <a>
            <i className="bx bxs-dashboard" />
            <span className="text">Home</span>
          </a>
        </li>
        <li className={active == "Products" ? "active" : ""}>
          <a onClick={() => navigate("/shop/products")}>
            <i class="bx bxs-book-reader"></i>
            <span className="text">Products</span>
          </a>
        </li>
        <li className={active == "Account" ? "active" : ""}>
          <a onClick={() => navigate("/shop/myaccount")}>
            <i class="bx bx-block"></i>
            <span className="text">Account</span>
          </a>
        </li>
        <li className={active == "Subs" ? "active" : ""}>
          <a onClick={() => navigate("/shop/activeplan")}>
            <i class="bx bxs-cog"></i>
            <span className="text">Subscription</span>
          </a>
        </li>
        <li className={active == "Chat" ? "active" : ""}>
          <a onClick={() => navigate("/shop/chat")}>
            <i class="bx bxs-business"></i>
            <span className="text">Chat</span>
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
