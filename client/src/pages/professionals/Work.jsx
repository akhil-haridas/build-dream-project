import React from 'react'
import WorkPage from 'components/professional/Work/Work'
import Navbar from 'components/professional/Navbar/Navbar'
import Sidebar from 'components/professional/Sidebar/Sidebar';

const Work = () => {
  return (
    <>
      <Sidebar active={"Works"} />
      <section id="content">
        <Navbar />
        <WorkPage />
      </section>
    </>
  );
}

export default Work