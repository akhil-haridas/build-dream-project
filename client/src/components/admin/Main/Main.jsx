import React,{useState,useEffect} from "react";
import "./Main.css";
import Axios from 'axios'
import { AdminAPI } from "utils/api";
const Main = () => {

  const [data,setData] = useState([])
  useEffect(() => {
    Axios.get(`${AdminAPI}dashboard`, { withCredentials: true })
      .then((response) => {
        setData(response.data.dataArray);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])
  return (
        <main>
          <div className="head-title">
            <div className="left">
              <h1>B U I L D - D R E A M</h1>
              <ul className="breadcrumb">
                <li>
                  <a f>Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active">
                    Home
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="box-info">
            <li>
              <i className="bx bxs-cart-alt" />
              <span className="text">
                <h3>{data[1]}</h3>
                <p>SHOPS</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group" />
              <span className="text">
            <h3>{data[2]}</h3>
                <p>PROFESSIONALS</p>
              </span>
            </li>
            <li>
              <i className="bx bx-rupee" />
              <span className="text">
                <h3>{data[3]}</h3>
                <p>Subscription</p>
              </span>
            </li>
          </ul>
          <div className="table-data">
            <div className="order">
              <div className="row">
                <div className="col-lg-6 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h1>Dasboard items</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
  
  );
};

export default Main;
