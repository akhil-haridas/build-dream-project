import React from "react";
import './Navbar.css'
const Navbar = () => {
  return (
    <nav>
      <i className="bx bx-menu" />
      <form action="#"></form>
      <input
        type="checkbox"
        id="switch-mode"
        hidden
        style={{ display: "none" }}
      />
      <label htmlFor="switch-mode" className="switch-mode" />
      <a href="/admin" className>
        <i className />
        <span className />
      </a>
    </nav>
  );
};

export default Navbar;
