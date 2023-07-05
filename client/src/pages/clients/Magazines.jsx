import Breadcrumb from "components/client/Breadcrumb/Breadcrumb";
import Footer from "components/client/Footer/Footer";
import MagazinePage from "components/client/Magazines/Magazine";
import Navbar from "components/client/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { USERAPI } from "utils/api";
import { useNavigate } from "react-router-dom";

const Magazines = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${USERAPI}getmagazines`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.magazines);
        setCategory(response.data.categories);
        setRequirements(response.data.requirements);
      })
      .catch((error) => {
        navigate("/server-error");
      });
  }, []);
  return (
    <>
      <Navbar active={"MAGAZINE"} />
      <Breadcrumb path={["Magazines"]} />
      <MagazinePage
        data={data}
        categories={category}
        requirements={requirements}
      />
      <Footer />
    </>
  );
};

export default Magazines;
