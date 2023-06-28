import React from 'react'
import Sidebar from "components/shop/Sidebar/Sidebar";
import Navbar from "components/shop/Navbar/Navbar";
import ActiveSubPage from 'components/shop/ActiveSub/ActiveSub'
const ActiveSubs = () => {
  return (
    <>
      <Sidebar active={"Subs"} />
      <section id="content">
        <Navbar />
        <ActiveSubPage />
      </section>
    </>
  );
}

export default ActiveSubs