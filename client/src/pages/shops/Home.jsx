import React from "react";
import Navbar from "components/shop/Navbar/Navbar";
import Sidebar from "components/shop/Sidebar/Sidebar";
import Magazine from "components/shop/Magazines/Magazine";
const Home = () => {
  return (
    <>
      <Sidebar active={"Home"} />
      <section id="content">
        <Navbar />
        <Magazine />
      </section>
    </>
  );
};

export default Home;
