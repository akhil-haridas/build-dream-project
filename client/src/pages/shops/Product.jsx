import Navbar from 'components/shop/Navbar/Navbar'
import React from 'react'
import ProductPage from 'components/shop/Product/Product'
import Sidebar from 'components/shop/Sidebar/Sidebar';

const Product = () => {
  return (
    <>
      <Sidebar active={"Products"} />
      <section id="content">
        <Navbar />
        <ProductPage />
      </section>
    </>
  );
}

export default Product