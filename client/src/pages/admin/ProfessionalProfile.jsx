import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminAPI } from "utils/api";
import ProfessionalProfilePage from "components/admin/ProfessionalProfile/ProfessionalProfile";
import Navbar from "components/admin/Navbar/Navbar";
import Sidebar from "components/admin/Sidebar/Sidebar";

const ProfessionalProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${AdminAPI}getprofessional?id=${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.DATA);
      })
      .catch((error) => {
         navigate("/server-error");
        console.log(error);
      });
  }, []);
  return (
    <>
      <Sidebar active={"Professionals"} />
      <section id="content">
        <Navbar />
        <ProfessionalProfilePage data={data} />
      </section>
    </>
  );
};

export default ProfessionalProfile;
