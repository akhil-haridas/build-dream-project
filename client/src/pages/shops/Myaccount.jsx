import React from 'react'
import Navbar from 'components/shop/Navbar/Navbar'
import MyaccountPage from 'components/shop/Myaccount/Myaccount'
import Sidebar from 'components/shop/Sidebar/Sidebar';
const Myaccount = () => {
  return (
    <>
      <Sidebar active={"Account"} />
      <section id="content">
        <Navbar />
        <MyaccountPage />
      </section>
    </>
  );
}

export default Myaccount