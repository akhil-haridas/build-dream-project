import React from 'react'
import Sidebar from "components/admin/Sidebar/Sidebar";
import Navbar from "components/admin/Navbar/Navbar";
import Table from 'components/admin/Table/Table';

const Permissions = () => {

  return (
    <>
      <Sidebar active={"Permissions"} />
      <section id="content">
        <Navbar />
      <Table/>
      </section>
    </>
  );
}

export default Permissions