import Navbar from 'components/professional/Navbar/Navbar';
import Sidebar from 'components/professional/Sidebar/Sidebar';
import AddMagazinePage from 'components/professional/AddMagazine/AddMagazine';
import React from 'react'

const AddMagazine = () => {
  return (
    <>
      <Sidebar active={"Magazines"} />
      <section id="content">
        <Navbar />
        <AddMagazinePage />
      </section>
    </>
  );
}

export default AddMagazine
