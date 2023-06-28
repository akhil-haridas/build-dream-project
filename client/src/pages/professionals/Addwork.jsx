import Navbar from 'components/professional/Navbar/Navbar';
import Sidebar from 'components/professional/Sidebar/Sidebar';
import React from 'react'
import AddworkPage from 'components/professional/Addwork/Addwork';
const Addwork = () => {
  return (
    <>
      <Sidebar active={"Works"} />
      <section id="content" style={{ background: "#eee" }}>
        <Navbar />
        <AddworkPage />
      </section>
    </>
  );
}

export default Addwork