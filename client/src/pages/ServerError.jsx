import React from 'react'
import { useNavigate } from 'react-router-dom';

const ServerError = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>500</h1>
            <h2>Internal Server Error</h2>
          </div>
          <a onClick={() => navigate("/")}>Homepage</a>
        </div>
      </div>
    </div>
  );
}

export default ServerError
