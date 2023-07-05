import React, { useState, useEffect } from "react";

import Sidebar from "components/admin/Sidebar/Sidebar";
import Navbar from "components/admin/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { AdminAPI } from "utils/api";
import Axios from "axios";
import ClientProfilePage from "components/admin/ClientProfile/ClientProfile";

const ClinetProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${AdminAPI}getclient?id=${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.DATA);
        console.log(response.data.DATA);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Sidebar active={"Clients"} />
      <section id="content">
        <Navbar />
        <ClientProfilePage data={data} />
      </section>
    </>
  );
};

export default ClinetProfile;
