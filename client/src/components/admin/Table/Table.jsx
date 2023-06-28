import React,{useEffect,useState} from 'react'
import './Table.css'
import Axios from 'axios';
import { AdminAPI } from 'utils/api';
const Table = () => {

const [data,setData] = useState([])
const [allow,setAllow] = useState(0)
      useEffect(() => {
        Axios.get(`${AdminAPI}permissions`, { withCredentials: true })
            .then((response) => {
              setData(response.data.data);
            console.log(response.data.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }, [allow]);
    
      const allowUSER = (id) => {
        Axios.get(`${AdminAPI}allow-user/${id}`, { withCredentials: true })
          .then((response) => {
              setAllow((prevState) => prevState + 1);
          })
          .catch((error) => {
            console.log(error);
          });
    };
    
          const denyUSER = (id) => {
            Axios.get(`${AdminAPI}deny-user/${id}`, { withCredentials: true })
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
          <h1>Permissions</h1>
          <ul className="breadcrumb">
            <li>
              <a>Permissions</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active">Permissions Management</a>
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
                <th>Name</th>
                <th>Joined</th>
                <th>Type</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
    <tr>
      <td colSpan={6}>
        <p>Users Not Found</p>
      </td>
    </tr>
  ) : ( data.map((obj, index) => {
                return (
                  <tr>
                    <td>
                      <p style={{ marginTop: "21px", fontWeight: 600 }}>1</p>
                    </td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold " style={{ fontWeight: 600 }}>
                            {obj.name}
                          </p>
                          <p className="text-muted mb-0">{obj.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal ">{obj.createdAt.slice(0, 10)}</p>
                    </td>
                    <td>{obj.role}</td>
                    <td onClick={() => allowUSER(obj._id)}>
                      <p>
                        <a>
                          <span className="status process">Allow</span>
                        </a>
                      </p>
                    </td>
                    <td onClick={() => denyUSER(obj._id)}>
                      <a>
                        <span className="status" style={{ background: "red" }}>
                          Deny
                        </span>
                      </a>
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Table