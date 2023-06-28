import React from 'react'
import Navbar from 'components/professional/Navbar/Navbar'
import MyaccountPage from 'components/professional/Myaccount/Myaccount'
import Sidebar from 'components/professional/Sidebar/Sidebar'
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