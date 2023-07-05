import React, { useState, useEffect } from "react";
import { AdminAPI } from "utils/api";
import Axios from "axios";
const Subscription = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${AdminAPI}getsubscriptions`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.subscriptions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Subscriptions</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/admin/customers">Subscription</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="/admin/customers">
                Subscription Management
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="table-data">
        <div className="order">
          <nav style={{ overflow: "hidden" }}>
            <form action style={{ marginLeft: "439px", marginBottom: "18px" }}>
              <div className="form-input bg-transparent">
                <input
                  type="search"
                  placeholder="Search..."
                  name="search"
                  aria-label="search"
                  autoComplete="off"
                />
                <button type="submit" className="search-btn">
                  <i className="bx bx-search" />
                </button>
              </div>
            </form>
          </nav>

          <table className="table align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>No.</th>
                <th>Plan Name</th>
                <th>Price</th>
                <th>User Name</th>
                <th>User Role</th>
                <th>Purchased On</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <p>Users Not Found</p>
                  </td>
                </tr>
              ) : (
                data.map((obj, index) => {
                  return (
                    <tr key={obj._id}>
                      <td>
                        <p style={{ fontWeight: 600 }}>{index + 1}</p>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p
                              className="fw-bold mb-1"
                              style={{ fontWeight: 600 }}
                            >
                              {obj.planName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p
                          className="fw-normal mb-1"
                          style={{ color: "green" }}
                        >
                          &#x20B9;&nbsp;{obj.plan}
                        </p>
                      </td>
                      <td>{obj.user.name} </td>
                      <td>{obj.user.role}</td>
                      <td>
                        <p>{obj.createdAt.slice(0, 10)}</p>
                      </td>
                      <td>
                        <p>{obj.expiry.slice(0, 15)}</p>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Subscription;
