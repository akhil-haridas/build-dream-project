import Navbar from "components/professional/Navbar/Navbar";
import Sidebar from "components/professional/Sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import MagazinePage from "components/professional/Magazines/Magazine";
import { PROFESSIONALAPI } from "utils/api";
import Axios from "axios";
const Magazine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${PROFESSIONALAPI}getmagazines`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const { success, magazines } = response.data;
        if (success) {
          setData(magazines);
        } else {
          // Handle error case
          console.log("Failed to retrieve magazines");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Sidebar active={"Magazines"} />
      <section id="content">
        <Navbar />
        <MagazinePage data={data} />
      </section>
    </>
  );
};

export default Magazine;
