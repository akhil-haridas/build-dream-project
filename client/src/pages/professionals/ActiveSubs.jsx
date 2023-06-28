import React from 'react'
import ActiveSubPage from 'components/professional/ActiveSub/ActiveSub'
import Navbar from 'components/professional/Navbar/Navbar'
import Sidebar from 'components/professional/Sidebar/Sidebar';

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