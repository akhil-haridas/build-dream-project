import React from 'react'
import './ProfessionalProfile.css'
const ProfessionalProfile = ({data}) => {
 return (
   <main>
     <div className="head-title">
       <div className="left">
         <h1>Professionals</h1>
         <ul className="breadcrumb">
           <li>
             <a href="/admin/home">Professionals</a>
           </li>
           <li>
             <i className="bx bx-chevron-right" />
           </li>
           <li>
             <a className href="/admin/customers">
               Professional management
             </a>
           </li>
           <li>
             <i className="bx bx-chevron-right" />
           </li>
           <li>
             <a className="active" href="/admin/overview">
               Overview Professional
             </a>
           </li>
         </ul>
       </div>
     </div>
     <div className="table-data" style={{ padding: "10px" }}>
       <div className="order">
         <div className="head">
           <p style={{ fontSize: "20px" }}>
             about 
             <span
               style={{
                 fontSize: "30px",
                 color: "#3C91E6",
                 textTransform: "uppercase",
                 fontWeight: "bolder",
               }}
             >
               {data.name}
             </span>
           </p>
         </div>
         <div className="bg-transparent  w-[99%]" id="about">
           <div className="container">
             <div className="col-lg-6 " style={{ maxWidth: "100%" }}>
               <div className="about-text go-to">
                 <h6 className="theme-color lead">{data.expertise}</h6>
                 <p>
                   <mark>Bio :</mark>
                   {data.bio}
                 </p>
                 <div className="row about-list">
                   <div className="col-md-6">
                     <div className="media">
                       <label>Joined</label>
                       <p>{data.createdAt}</p>
                     </div>
                     <div className="media">
                       <label>Employment Type</label>
                       <p>{data.employmentType}</p>
                     </div>
                     <div className="media">
                       <label>Location</label>
                       <p>{data.location}</p>
                     </div>
                     <div className="media">
                       <label>District</label>
                       <p>{data.district}</p>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="media">
                       <label>E-mail</label>
                       <p>
                         <a
                           href="/cdn-cgi/l/email-protection"
                           className="__cf_email__"
                           data-cfemail="2d44434b426d4942404c4443034e4240"
                         >
                           {data.email}
                         </a>
                       </p>
                     </div>
                     <div className="media">
                       <label>Phone</label>
                       <p>+91 {data.mobile}</p>
                     </div>
                     <div className="media">
                       <label>Linked In</label>
                       <p>{data.linkedin}</p>
                     </div>
                     <div className="media">
                       <label>Instagram</label>
                       <p>{data.insta}</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </main>
 );
}

export default ProfessionalProfile