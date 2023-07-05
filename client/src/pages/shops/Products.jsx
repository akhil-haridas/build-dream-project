import Navbar from "components/shop/Navbar/Navbar";
import ProductsPage from "components/shop/Products/Products";
import React, { useState, useEffect } from "react";
import { SHOPAPI } from "utils/api";
import Axios from "axios";
import Sidebar from "components/shop/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const [data, setData] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${SHOPAPI}getdetailss`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.data.products);
      })
      .catch((error) => {
         navigate("/server-error");
        console.log(error);
      });
  }, []);
  return (
    <>
      <Sidebar active={"Products"} />
      <section id="content">
        <Navbar />
        <ProductsPage data={data} />
      </section>
    </>
  );
};

export default Products;
