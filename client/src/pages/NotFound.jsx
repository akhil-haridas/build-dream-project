import React from "react";
import '../styles/notfound.css'
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <a onClick={()=>navigate('/')}>Homepage</a>
      </div>
    </div>
  );
};

export default NotFound;
