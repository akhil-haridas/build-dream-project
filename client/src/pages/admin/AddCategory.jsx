import React from 'react'

import Sidebar from 'components/admin/Sidebar/Sidebar' 
import Navbar from 'components/admin/Navbar/Navbar'    
import AddCategoryPage from 'components/admin/AddCategory/AddCategory'
const AddCategory = () => {
  return (
    <>
      <Sidebar active={"Category"} />
      <section id='content'>
              <Navbar />
              <AddCategoryPage/>
      </section>
    </>
  );
}

export default AddCategory