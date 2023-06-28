import Navbar from 'components/admin/Navbar/Navbar';
import Sidebar from 'components/admin/Sidebar/Sidebar';
import ShopsPage from 'components/admin/Shops/Shops';
import React from 'react'

const Shops = () => {
 return (
   <>
     <Sidebar active={"Shops"} />
     <section id="content">
       <Navbar />
       <ShopsPage />
     </section>
   </>
 );
}

export default Shops