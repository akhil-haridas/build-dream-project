import React from 'react'
import Navbar from 'components/professional/Navbar/Navbar'
import Sidebar from 'components/professional/Sidebar/Sidebar';
import HomePage from 'components/professional/Home/Home';

const Home = () => {
  return (
    <>
      <Sidebar active={"Home"} />
      <section id="content">
        <Navbar />
        <HomePage />
      </section>
    </>
  );
}

export default Home