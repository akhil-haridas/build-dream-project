import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAPI, imageAPI } from "utils/api";
import Axios from "axios";
const Categories = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [allow, setAllow] = useState(1);
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${AdminAPI}getcategories`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allow]);
  const removeCategory = (id) => {
    const token = localStorage.getItem("token");
    Axios.get(`${AdminAPI}removeCategory/${id}`, {
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
          <h1>Categories</h1>
          <ul className="breadcrumb">
            <li>
              <a>Categories</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="/admin/category">
                Category Management
              </a>
            </li>
          </ul>
        </div>
        <a
          onClick={() => navigate("/admin/categories/addcategory")}
          className="btn-download"
        >
          <i className="bx bx-plus-circle" />
          <span className="text">Add Category</span>
        </a>
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
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>

                <th>Remove</th>
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
                      <td>{index + 1}  </td>
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
                              style={{ fontWeight: 700 }}
                            >
                              {obj.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{obj.role}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <button
                          style={{ border: "none", background: "transparent" }}
                        >
                          <a>
                            <span
                              className="status remove"
                              onClick={() => removeCategory(obj._id)}
                            >
                              Remove
                            </span>
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

export default Categories;
