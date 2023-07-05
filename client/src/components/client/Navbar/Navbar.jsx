import React,{useEffect,useState} from "react";
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
    localStorage.clear();
    navigate("/login");
  };

  
  
    useEffect(() => {
    const showMenu = (toggleId, navId) => {
      const toggle = document.getElementById(toggleId);
      const nav = document.getElementById(navId);

      toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
        toggle.classList.toggle('show-icon');
      });
    };

    showMenu('nav-toggle', 'nav-menu');

    const dropdownItems = document.querySelectorAll('.dropdown__item');

    dropdownItems.forEach((item) => {
      const dropdownButton = item.querySelector('.dropdown__button');

      dropdownButton.addEventListener('click', () => {
        const showDropdown = document.querySelector('.show-dropdown');

        toggleItem(item);

        if (showDropdown && showDropdown !== item) {
          toggleItem(showDropdown);
        }
      });
    });

    const toggleItem = (item) => {
      const dropdownContainer = item.querySelector('.dropdown__container');

      if (item.classList.contains('show-dropdown')) {
        dropdownContainer.removeAttribute('style');
        item.classList.remove('show-dropdown');
      } else {
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px';
        item.classList.add('show-dropdown');
      }
    };

    const mediaQuery = window.matchMedia('(min-width: 1118px)');
    const dropdownContainer = document.querySelectorAll('.dropdown__container');

    const removeStyle = () => {
      if (mediaQuery.matches) {
        dropdownContainer.forEach((e) => {
          e.removeAttribute('style');
        });

        dropdownItems.forEach((e) => {
          e.classList.remove('show-dropdown');
        });
      }
    };

    window.addEventListener('resize', removeStyle);

    // Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener('resize', removeStyle);
    };
    }, []);


  return (
    <header class="header">
      <nav class="nav container">
        <div class="nav__data align-items-center">
          <a href="/">
            <img src="/images/LogoBlack.png" alt="Logo" class="nav__logo-img" />
          </a>

          <div class="nav__toggle show-menu" id="nav-toggle">
            <box-icon name="menu-alt-left" class="nav__toggle-menu"></box-icon>
            <box-icon
              name="x-circle"
              type="solid"
              class="nav__toggle-close"
            ></box-icon>
          </div>
        </div>

        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list">
            <li>
              <a
                onClick={() => navigate("/")}
                className={active == "HOME" ? "nav__link_active" : "nav__link"}
              >
                HOME
              </a>
            </li>

            <li>
              <a
                onClick={() => navigate("/shops")}
                className={active == "SHOPS" ? "nav__link_active" : "nav__link"}
              >
                SHOPS
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/professionals")}
                className={
                  active == "PROFESSIONALS" ? "nav__link_active" : "nav__link"
                }
              >
                PROFESSIONALS
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/magazines")}
                className={
                  active == "MAGAZINE" ? "nav__link_active" : "nav__link"
                }
              >
                MAGAZINE
              </a>
            </li>
            <li class="dropdown__item">
              <div class="nav__link dropdown__button">
                <box-icon type="solid" name="user-circle"></box-icon>
              </div>

              <div class="dropdown__container">
                <div class="dropdown__content">
                  {user ? (
                    <>
                      <div
                        class="dropdown__group"
                        onClick={() => navigate("/myaccount")}
                      >
                        <div class="dropdown__icon">
                          <box-icon name="user-account" type="solid"></box-icon>
                        </div>
                        <span class="dropdown__title">My Account</span>
                      </div>
                      <div
                        class="dropdown__group"
                        onClick={() => navigate("/chat")}
                      >
                        <div class="dropdown__icon">
                          <box-icon name="conversation"></box-icon>
                        </div>
                        <span class="dropdown__title">Chat</span>
                      </div>
                      <div class="dropdown__group" onClick={logout}>
                        <div class="dropdown__icon">
                          <box-icon name="exit"></box-icon>
                        </div>
                        <span class="dropdown__title">Logout</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="dropdown__group">
                        <div class="dropdown__icon">
                          <box-icon name="home-alt-2"></box-icon>
                        </div>
                        <span class="dropdown__title">Client</span>
                        <ul class="dropdown__list">
                          <li>
                            <a
                              onClick={() => navigate("/")}
                              class="dropdown__link"
                            >
                              Home
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => navigate("/login")}
                              class="dropdown__link"
                            >
                              Login
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => navigate("/signup/client")}
                              class="dropdown__link"
                            >
                              Signup
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div class="dropdown__group">
                        <div class="dropdown__icon">
                          <box-icon name="user"></box-icon>
                        </div>

                        <span class="dropdown__title">Professional</span>
                        <ul class="dropdown__list">
                          <li>
                            <a
                              onClick={() => navigate("/professional")}
                              class="dropdown__link"
                            >
                              Home
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => navigate("/professional/login")}
                              class="dropdown__link"
                            >
                              Login
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => navigate("/professional/signup")}
                              class="dropdown__link"
                            >
                              Signup
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div class="dropdown__group">
                        <div class="dropdown__icon">
                          <box-icon name="shopping-bag"></box-icon>
                        </div>

                        <span class="dropdown__title">Shop</span>
                        <ul class="dropdown__list">
                          <li>
                            <a
                              onClick={() => navigate("/shop")}
                              class="dropdown__link"
                            >
                              Home
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => navigate("/shop/login")}
                              class="dropdown__link"
                            >
                              Login
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => navigate("/shop/signup")}
                              class="dropdown__link"
                            >
                              Signup
                            </a>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
