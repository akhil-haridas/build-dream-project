import React, { useState,useEffect } from 'react'
import { Helmet } from 'react-helmet';
import Axios from 'axios'
import { USERAPI } from 'utils/api';
import './templatemo-stand-blog.css'

const Magazine = ({ data, categories ,requirements}) => {

  const [category,setCategory] = useState("")
const [requirement,setRequirement] =  useState("")
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

    const submitHandler = (event) => {
      event.preventDefault();

      Axios.post(
        `${USERAPI}addrequirement`,
        { category, requirement },
        { withCredentials: true }
      ).then((response) => {
        alert("POSTED")
      });
  };
  
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossorigin="anonymous"
        />
      </Helmet>
      <div className="w-50 ml-20 pl-5 bg-gray-50 border border-solid border-teal-50 flex flex-col items-center justify-start p-[21px] sm:px-5 rounded-[35px] w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <span
            className="text-blue_gray-800 text-sm tracking-[0.10px]"
            size="txtRobotoRegular14"
          >
            Create New Post
          </span>
          <input
            name="rectangle"
            onChange={(e) => setRequirement(e.target.value)}
            placeholder=""
            className="p-0 w-full"
            wrapClassName="bg-white-A700 border border-black-900_33 border-solid flex h-[42px] mt-[17px] rounded-[21px] w-full"
          />

          <select onChange={(e) => setCategory(e.target.value)}>
            {categories.map((item) => (
              <option>{item.name}</option>
            ))}
          </select>

          <button onClick={submitHandler}>POST</button>
        </div>
      </div>
      <section className="blog-posts">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="all-blog-posts">
                <div className="row">
                  {data.map((item) => (
                    <div className="col-lg-12">
                      <div className="blog-post">
                        <div className="blog-thumb">
                          <img
                            src={`http://localhost:4000/uploads/Professionals/${item.image}`}
                            alt=""
                          />
                        </div>
                        <div className="down-content">
                          <span>{item.user.expertise}</span>
                          <a href="post-details.html">
                            <h4>{item.title}</h4>
                          </a>
                          <ul className="post-info">
                            <li>
                              <a href="#">{item.user.name}</a>
                            </li>
                            <li>
                              <a href="#">{formatDate(item.createdAt)}</a>
                            </li>
                            {/* <li>
                                <a href="#">12 Comments</a>
                              </li> */}
                          </ul>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-lg-12">
                    <div className="main-button">
                      <a href="blog.html">View All Posts</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="sidebar-item search">
                      <form id="search_form" name="gs" method="GET" action="#">
                        <input
                          type="text"
                          name="q"
                          className="searchText"
                          placeholder="type to search..."
                          autoComplete="on"
                        />
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="sidebar-item recent-posts">
                      <div className="sidebar-heading">
                        <h2>Recent Requirements</h2>
                      </div>
                      <div className="content">
                        <ul>
                          {requirements.map((item) => (
                            <li>
                              <a href="post-details.html">
                                <h5>{item.requirement}</h5>
                                <p>{ item.user.name}</p>
                                <span>{formatDate(item.createdAt)}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Magazine
