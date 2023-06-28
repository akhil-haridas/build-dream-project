import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { clientActions } from "store/clientAuth";

const Navbar = ({active}) => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userName)

    const dispatch = useDispatch();
    const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
    const logout = () => {
      removeCookie("jwt");
      dispatch(clientActions.clientLogout());
      navigate("/login");
    };
  

  return (
    <header className="Nheader">
      <div className=" mx-auto sm:px-4 mx-auto sm:px-4 max-w-full mx-auto sm:px-4">
        <div className="flex flex-wrap">
          <div className="xl:w-1/4  pl-[3rem] lg:w-1/5 mt-[-40px]">
            <div className="navbarheader__logo">
              <a href="/">
                <img src="/images/LogoBlack.png" alt="" />
              </a>
            </div>
          </div>
          <div className="xl:w-1/2 pl-[4rem] lg:w-3/5">
            <nav className="navbarheader__menu">
              <ul>
                <li className={active == "SHOPS" ? "active" : ""}>
                  <a onClick={() => navigate("/shops")}>SHOPS</a>
                </li>
                <li className={active == "PROFESSIONALS" ? "active" : ""}>
                  <a onClick={() => navigate("/professionals")}>
                    PROFESSIONALS
                  </a>
                </li>
                <li className={active == "MAGAZINES" ? "active" : ""}>
                  <a onClick={() => navigate("/magazines")}>MAGAZINES</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="lg:w-1/4 pl-[5rem]">
            <div className="navbarheader__right pt-[28px]">
              <div
                className="navbarheader__right__auth"
                style={{ cursor: "pointer" }}
              >
                {user ? (
                  <a onClick={() => navigate("/myaccount")}>{user}</a>
                ) : (
                  <a
                    onClick={() => navigate("/login")}
                    style={{ paddingLeft: "50px" }}
                  >
                    Login
                  </a>
                )}

                {user ? (
                  <a onClick={logout}>Logout</a>
                ) : (
                  <a onClick={() => navigate("/signup")}>Register</a>
                )}
              </div>
            </div>
          </div>
          {user ? (
            <ul className="navbarheader__right__widget pl-[7px] pt-[27px]">
              <li>
                <a onClick={() => navigate("/chat")}>
                  <box-icon
                    name="chat"
                    animation="tada"
                    color="#666666"
                  ></box-icon>
                </a>
              </li>
              <li>
                <a href="/cart">
                  <box-icon
                    name="bell"
                    animation="tada"
                    color="#666666"
                  ></box-icon>
                </a>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
