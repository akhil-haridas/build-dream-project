import React from 'react'

import Sidebar from "components/admin/Sidebar/Sidebar";
import Navbar from "components/admin/Navbar/Navbar";
import CategoriesPage from 'components/admin/Categories/Categories';

const Categories = () => {
    return (
        <>
            <Sidebar active={"Category"} />
            <section id='content'>
                <Navbar />
                <CategoriesPage/>
            </section>
            
        </>
    )
}

export default Categories