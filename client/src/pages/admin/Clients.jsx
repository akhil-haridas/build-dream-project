import React from 'react'

import Sidebar from 'components/admin/Sidebar/Sidebar';
import Navbar from 'components/admin/Navbar/Navbar';
import ClientsPage from 'components/admin/Clients/Clients';

const Clients = () => {
  return (
    <>
      <Sidebar active={'Clients'} />
      <section id='content'>
        <Navbar />
        <ClientsPage/>
      </section>
   </>
  )
}

export default Clients;