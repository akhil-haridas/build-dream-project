import React, { useState } from 'react'
import './Works.css'

const Works = ({data}) => {

  const [displayCount, setDisplayCount] = useState(6);

  if (!Array.isArray(data)) {
    return null;
  }

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 6);
  };

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        <h6 className="section-title text-center">{ data && data.length > 0 ? "My Projects" : "Currently doesn't have any projects!"}</h6>
        <h6 className="section-subtitle mb-5 text-center pb-[2rem]">
          {data&& data.length > 0 ? "New stunning projects for my amazing clients" : ""}
        </h6>
        { data && data.length > 0 ? (<div className="filters">
          <a href="#" data-filter=".new" className="active">
            New
          </a>
          <a href="#" data-filter=".advertising">
            New
          </a>
          <a href="#" data-filter=".branding">
            New
          </a>
          <a href="#" data-filter=".web">
            New
          </a>
        </div>) : ""}
        
        <div className="portfolio-container pl-[3rem] pr-[3rem]">
          {data.slice(0, displayCount).map((work, index) => (
            <div className={`col-md-6 col-lg-4`} key={index}>
              <div className="portfolio-item">
                <img
                  src={`http://localhost:4000/uploads/${work.image.replace(
                    "\\",
                    "/"
                  )}`}
                  className="img-fluid"
                  alt={work.title}
                />
                <div className="content-holder">
                  <a
                    className="img-popup"
                    href={`http://localhost:4000/uploads/${work.image.replace(
                      "\\",
                      "/"
                    )}`}
                  />
                  <div className="text-holder">
                    <h6 className="title">{work.title}</h6>
                    <p className="subtitle">{work.description}RS</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="mb-[2rem]"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {displayCount < data.length && (
          <button className="btn btn-theme-outline" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
}

export default Works