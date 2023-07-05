import React, { useEffect, useState } from "react";
import { AdminAPI, imageAPI } from "utils/api";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [allow, setAllow] = useState(1);

  const handleProfileClick = (id) => {
    navigate(`/admin/clients/${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${AdminAPI}getclients`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allow]);

  const blockUser = (id) => {
    const token = localStorage.getItem("token");
    Axios.get(`${AdminAPI}blockclient/${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setAllow((prevState) => prevState + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Clients</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/admin/customers">Clients</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="/admin/customers">
                Client Management
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
                <th />
                <th>Name</th>
                <th>Joined</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>About</th>
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
                        <p style={{ marginTop: "21px", fontWeight: 600 }}>
                          {index + 1}
                        </p>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={`${imageAPI}${obj.image}`}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p
                              className="fw-bold mb-1"
                              style={{ fontWeight: 600 }}
                            >
                              {obj.name}
                            </p>
                            <p className="text-muted mb-0">{obj.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">
                          {obj.createdAt.slice(0, 10)}
                        </p>
                      </td>
                      <td>+91 {obj.mobile} </td>
                      <td>
                        <p>
                          <a onClick={() => blockUser(obj._id)}>
                            {!obj.block ? (
                              <span className="status process">Active</span>
                            ) : (
                              <span
                                className="status"
                                style={{ background: "red" }}
                              >
                                Blocked
                              </span>
                            )}
                          </a>
                        </p>
                      </td>
                      <td>
                        <button
                          style={{ border: "none", background: "transparent" }}
                        >
                          <a
                            style={{ textDecoration: "none" }}
                            onClick={() => handleProfileClick(obj._id)}
                          >
                            <span className="status more">View</span>
                          </a>
                        </button>
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

export default Clients;
