import React,{useState} from 'react'
import './Shops.css'
import { useNavigate } from 'react-router-dom';
import { imageAPI } from 'utils/api';
const ShopProfile = ({data}) => {
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(4);

  const handleProfileClick = (id) => {
    navigate(`/shops/${id}`);
  };

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 4);
  };

  if (!Array.isArray(data)) {
    return null;
  }
  
  return (
    <>
      {data.slice(0, displayCount).map((obj) => (
        <div
          key={obj._id}
          className="col-md-3 col-xs-6 w-[250px] ml-[50px] mb-[4rem]"
          onClick={() => handleProfileClick(obj._id)}
          style={{ cursor: "pointer" }}
        >
          <div className="team-member">
            <div className="flipper">
              <div
                className="team-member-front"
                style={{ boxShadow: "0px 0px 6px rgba(0, 0, 0, 1.1)" }}
              >
                <div className="team-member-thumb">
                  <img
                    src={`${imageAPI}${obj.image}`}
                    alt="profile photo"
                    className="img-res"
                  />
                </div>{" "}
                <p className="team-member-front-name">{obj.name}</p>
                <p
                  style={{
                    textAlign: "center",
                    color: "#ca1515",
                    fontWeight: "600",
                  }}
                >
                  {obj.category}
                </p>
              </div>
              <div
                className="team-member-back"
                style={{
                  boxShadow: "0px 0px 6px rgba(0, 0, 0, 1.1)",
                  minWidth: "250px",
                }}
              >
                <div className="team-member-info">
                  <h3 className="team-member-back-name">{obj.name}</h3>

                  <p className="team-member-back-position">{obj.category}</p>
                  <p className="team-member-back-info">{obj.bio}</p>
                  <div className="social-icons small">
                    <a href={obj?.facebook} className="rectangle">
                      <i className="fa fa-facebook" />
                    </a>
                    <a href={obj?.twitter} className="rectangle">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href={obj?.linkedin} className="rectangle">
                      <i className="fa fa-linkedin" />
                    </a>
                    <a href={obj?.insta} className="rectangle">
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {data.length > displayCount && (
        <div
          className="mb-[2rem]"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button className="btn btn-theme-outline" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default ShopProfile