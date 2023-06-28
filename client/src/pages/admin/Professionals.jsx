import Navbar from 'components/admin/Navbar/Navbar';
import Sidebar from 'components/admin/Sidebar/Sidebar';
import ProfessionalsPage from 'components/admin/Professionals/Professionals';
import React from 'react'

const Professionals = () => {
 return (
   <>
     <Sidebar active={"Professionals"} />
     <section id="content">
       <Navbar />
       <ProfessionalsPage />
     </section>
   </>
 );
}

export default Professionals