import React, { useState, useEffect } from "react";
import { SHOPAPI } from "utils/api";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
const ActiveSub = () => {
  const [data, setData] = useState([]);
const navigate =  useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${SHOPAPI}getplan`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.plan);
      })
      .catch((error) => {
         navigate("/server-error");
        console.log(error);
      });
  }, []);
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Subscription</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/admin/home">Home</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="/admin/overview">
                Subscription Plan
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="table-data" style={{ padding: "10px" }}>
        <div className="order">
          <div className="head">
            <p style={{ fontSize: "20px" }}>
              about 
              <span
                style={{
                  fontSize: "30px",
                  color: "#3C91E6",
                  textTransform: "uppercase",
                  fontWeight: "bolder",
                }}
              >
                {data.planName}
              </span>
            </p>
          </div>
          <div className="bg-transparent  w-[99%]" id="about">
            <div className="container">
              <div className="col-lg-6 " style={{ maxWidth: "100%" }}>
                <div className="about-text go-to">
                  <div className="row about-list">
                    <div className="col-md-6">
                      <div className="media">
                        <label>Price</label>
                        <p>
                          <i className="fa fa-rupee" /> {data.plan}
                        </p>
                      </div>
                      <div className="media">
                        <label>Purchase Date</label>
                        <p>{data.createdAt}</p>
                      </div>
                      <div className="media">
                        <label>Expiry Date</label>
                        <p>{data.expiry}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ActiveSub;
