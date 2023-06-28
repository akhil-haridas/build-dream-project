import Breadcrumb from 'components/client/Breadcrumb/Breadcrumb';
import Footer from 'components/client/Footer/Footer';
import MagazinePage from "components/client/Magazines/Magazine";
import Navbar from 'components/client/Navbar/Navbar';
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { USERAPI } from 'utils/api';

const Magazines = () => {
  const [data, setData] = useState([])
  const [category, setCategory] = useState([])
  const [requirements,setRequirements] = useState([])
  
  useEffect(() => {
    Axios.get(`${USERAPI}getmagazines`, { withCredentials: true })
      .then((response) => {
        setData(response.data.magazines);
        setCategory(response.data.categories)
        setRequirements(response.data.requirements);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])
  return (
    <>
      <Navbar active={"MAGAZINES"} />
      <Breadcrumb path={["Magazines"]} />
      <MagazinePage
        data={data}
        categories={category}
        requirements={requirements}
      />
      <Footer />
    </>
  );
}

export default Magazines
