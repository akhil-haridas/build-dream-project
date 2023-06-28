import React from 'react'
import MagazinePage from 'components/professional/Magazine/Magazine'
import Sidebar from 'components/professional/Sidebar/Sidebar';
import Navbar from 'components/professional/Navbar/Navbar';
const Magazine = () => {
  return (
    <>
      <Sidebar active={"Magazines"} />
      <section id="content">
        <Navbar />
        <MagazinePage />
      </section>
    </>
  );
}

export default Magazine
