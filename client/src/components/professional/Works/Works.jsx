import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROFESSIONALAPI, imageAPI } from "utils/api";
import Axios from "axios";
const Works = ({ data, updateData }) => {
  console.log(data, "WORKS PAGE");
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(6);

  if (!Array.isArray(data)) {
    return null;
  }

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 6);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this work?")) {
      Axios.delete(`${PROFESSIONALAPI}deletework?id=${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const result = response.data;
          console.log(result);
          if (result.status) {
            alert("Deleted successfully");
            updateData(id); // Pass the `id` directly
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Works</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/admin/customers">Works</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="/admin/customers">
                Works Management
              </a>
            </li>
          </ul>
        </div>
        <a
          onClick={() => navigate("/professional/works/addwork")}
          class="btn-download"
        >
          <i class="bx bx-image-add"></i>
          <span class="text">Add new Work</span>
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
                <th>Title</th>
                <th>Description</th>
                <th>View</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <p>Works Not Found</p>
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
                          {obj.image ? (
                            <img
                              src={`${imageAPI}${obj.image}`}
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                          ) : (
                            <img
                              src=""
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p
                              className="fw-bold mb-1"
                              style={{ fontWeight: 600 }}
                            >
                              {obj.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{obj.description}</p>
                      </td>
                      <td>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                          }}
                          onClick={() =>
                            navigate(`/professional/works/${obj._id}`)
                          }
                        >
                          <a style={{ textDecoration: "none" }}>
                            <span className="status more">View</span>
                          </a>
                        </button>
                      </td>
                      <td>
                        <p>
                          <a onClick={() => handleDelete(obj._id)}>
                            <span
                              className="status"
                              style={{ background: "red" }}
                            >
                              Remove
                            </span>
                          </a>
                        </p>
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

export default Works;
