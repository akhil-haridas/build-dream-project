import React, { useEffect, useState } from "react";

import Banner from "components/client/Banner/Banner";
import Navbar from "components/client/Navbar/Navbar";
import Search from "components/client/Search/Search";
import Category from "components/client/Category/Category";
import Footer from "components/client/Footer/Footer";

import Axios from "axios";
import { USERAPI } from "utils/api";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [pro, setPro] = useState([]);
  const [shop, setShop] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${USERAPI}getcategories`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setPro(response.data.proDATA);
        setShop(response.data.shopDATA);
      })
      .catch((error) => {
        console.log(error);
        navigate("/server-error");
      });
  }, []);
  return (
    <>
      <Navbar active={"HOME"} />
      <div className="bg-white_A700 flex flex-col font-rubik items-center justify-end mx-auto w-full">
        <div className="flex flex-col justify-end w-full">
          <Banner />
          <Search />
          <Category data={pro} title={"Find Professionals..."} />
          <Category data={shop} title={"Find Best Stores..."} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
