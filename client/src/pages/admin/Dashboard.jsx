import React from 'react'
import Main from 'components/admin/Main/Main'
import Sidebar from 'components/admin/Sidebar/Sidebar'
import Navbar from 'components/admin/Navbar/Navbar'

const Dashboard = () => {
  return (
    <>
      <Sidebar active={"Dashboard"} />
      <section id="content">
        <Navbar />
        <Main />
      </section>
    </>
  );
}

export default Dashboard