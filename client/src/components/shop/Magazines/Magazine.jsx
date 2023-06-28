import React from "react";
import "boxicons";
const Magazine = () => {
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>M A G Z I N E S</h1>
        </div>
      </div>
      <ul className="box-info">
        <li>
          <i className="bx bxs-cart-alt" />
          <span className="text">
            <h3>No</h3>
            <p>Nothing</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-group" />
          <span className="text">
            <h3>No</h3>
            <p>Nothing</p>
          </span>
        </li>
        <li>
          <i className="bx bx-rupee" />
          <span className="text">
            <h3> No</h3>
            <p>Nothing</p>
          </span>
        </li>
      </ul>
      <div className="table-data">
        <div className="order">
          <div className="row">
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h1>Home items</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Magazine;
