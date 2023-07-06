import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { professionalActions } from "store/professionalAuth";
const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.professional.professionalName);
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
  const logout = () => {
    localStorage.removeItem()
    removeCookie("jwt");
    dispatch(professionalActions.professionalLogout());
    navigate("/professional/login");
  };
  return (
    <section id="sidebar">
      <a className="brand">
        <i className="bx bxs-smile" />
        <span className="text">{userName}</span>
      </a>
      <ul className="side-menu top">
        <li className={active == "Home" ? "active" : ""}>
          <a onClick={() => navigate("/professional")}>
            <i className="bx bxs-dashboard" />
            <span className="text">Home</span>
          </a>
        </li>
        <li className={active == "Works" ? "active" : ""}>
          <a onClick={() => navigate("/professional/works")}>
            <i class="bx bxs-book-reader"></i>
            <span className="text">Works</span>
          </a>
        </li>
        <li className={active == "Account" ? "active" : ""}>
          <a onClick={() => navigate("/professional/myaccount")}>
            <i class="bx bx-block"></i>
            <span className="text">Account</span>
          </a>
        </li>
        <li className={active == "Magazines" ? "active" : ""}>
          <a onClick={() => navigate("/professional/magazines")}>
            <i class="bx bx-block"></i>
            <span className="text">Magazines</span>
          </a>
        </li>
        <li className={active == "Subs" ? "active" : ""}>
          <a onClick={() => navigate("/professional/activeplan")}>
            <i class="bx bxs-cog"></i>
            <span className="text">Subscription</span>
          </a>
        </li>
        <li className={active == "Chat" ? "active" : ""}>
          <a onClick={() => navigate("/professional/chat")}>
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
