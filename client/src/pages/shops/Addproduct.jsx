import Navbar from 'components/shop/Navbar/Navbar';
import Sidebar from 'components/shop/Sidebar/Sidebar';
import React from 'react'
import AddproductPage from 'components/shop/Addproduct/Addproduct';

const Addproduct = () => {
  return (
    <>
      <Sidebar active={"Products"} />
      <section id="content">
        <Navbar />
        <AddproductPage />
      </section>
    </>
  );
}

export default Addproduct
