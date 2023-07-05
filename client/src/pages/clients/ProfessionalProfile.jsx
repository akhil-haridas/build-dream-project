import React, { useState, useEffect } from "react";
import "boxicons";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { USERAPI } from "utils/api";

import Navbar from "components/client/Navbar/Navbar";
import Breadcrumb from "components/client/Breadcrumb/Breadcrumb";
import Professional from "components/client/Professional/Professional";
import Works from "components/client/Works/Works";
import Footer from "components/client/Footer/Footer";

const DetailProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${USERAPI}professional?id=${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.DATA);
      })
      .catch((error) => {
        navigate("/server-error");
      });
  }, []);
  return (
    <>
      <Navbar active={"PROFESSIONALS"} />
      <Breadcrumb path={["Professional", data.name]} />
      <Professional data={data} />
      <Works data={data.works} />
      <Footer />
    </>
  );
};

export default DetailProfile;
