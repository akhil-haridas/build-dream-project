import Navbar from 'components/shop/Navbar/Navbar'
import ProductsPage from 'components/shop/Products/Products';
import React,{useState,useEffect} from 'react'
import { SHOPAPI } from 'utils/api';
import Axios from 'axios'
import Sidebar from 'components/shop/Sidebar/Sidebar';
const Products = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      Axios.get(`${SHOPAPI}getdetailss`, {
        withCredentials: true,
      })
        .then((response) => {
          setData(response.data.data.products);
        })
        .catch((error) => {
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
}

export default Products