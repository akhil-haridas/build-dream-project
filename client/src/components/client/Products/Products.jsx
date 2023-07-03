import React,{useState} from "react";
import './Products.css'
const Products = ({ data }) => {
   const [displayCount, setDisplayCount] = useState(2);

   if (!Array.isArray(data)) {
     return null;
   }

   const handleLoadMore = () => {
     setDisplayCount(displayCount + 6);
   };
  return (
    <div className="portfolio" id="portfolio">
      <div className="pcontainer">
        <div
          className="section-header text-center wow zoomIn"
          data-wow-delay="0.1s"
        >
          <p>{data && data.length > 0 ? "Available Products" : ""}</p>
          {data && data.length > 0 ? (
            <h6 className="section-title text-center">My Projects</h6>
          ) : (
            <h2 className="section-title text-center mb-[-140px]">
              Currently doesn't have any products!
            </h2>
          )}
        </div>
        <div className="row portfolio-container">
          {data.slice(0, displayCount).map((product, index) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 portfolio-item pb-[3rem] filter-1 wow fadeInUp"
              data-wow-delay="0.0s"
            >
              <div className="portfolio-wrap">
                <div className="portfolio-img">
                  <img
                    src={`http://localhost:4000/uploads/${product.image.replace(
                      "\\",
                      "/"
                    )}`}
                    alt="Image"
                  />
                </div>
                <div className="portfolio-text">
                  <h3>
                    {product.name} - {product.price}RS
                  </h3>
                  <a
                    className="btn"
                    href={`http://localhost:4000/uploads/${product.image}`}
                    data-lightbox="portfolio"
                  >
                    +
                  </a>
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
    </div>
  );
  }
export default Products;
