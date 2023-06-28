import React from 'react'
import './Breadcrumb.css'

const Breadcrumb = ({path}) => {
  return (
    <div className="navbarbreadcrumb-option pl-[3rem]">
      <div className="container mx-auto sm:px-4">
        <div className="flex flex-wrap ">
          <div className="lg:w-full pr-4 pl-4">
            <div className="navbarbreadcrumb__links">
              <a href="/">
                <i className="fa fa-home" /> Home
              </a>
              {path.map((path, index) => (
                <a key={index}>{path}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb