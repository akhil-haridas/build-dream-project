import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profiles.css";
import { imageAPI } from "utils/api";

const Profiles = ({ data }) => {
  const navigate = useNavigate();

  const [displayCount, setDisplayCount] = useState(12);

  const handleProfileClick = (id) => {
    navigate(`/professionals/${id}`);
  };

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 4);
  };

  return (
    <>
      {data.slice(0, displayCount).map((profile) => (
        <div
          key={profile._id}
          className="col-md-3 col-xs-6 w-[250px] ml-[50px] mb-[4rem]"
          onClick={() => handleProfileClick(profile._id)}
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
                    src={imageAPI`${profile.image}`}
                    className="img-res"
                    alt=""
                  />
                </div>
                <p className="team-member-front-name">{profile.name}</p>
                <p
                  style={{
                    textAlign: "center",
                    color: "#ca1515",
                    fontWeight: "600",
                  }}
                >
                  {profile.expertise}
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
                  <h3 className="team-member-back-name">{profile.name}</h3>
                  <p className="team-member-back-position">
                    {profile.expertise}
                  </p>
                  <p className="team-member-back-info">{profile.bio}</p>
                  <div className="social-icons small">
                    <a href="#" className="rectangle">
                      <i className="fa fa-facebook" />
                    </a>
                    <a href="#" className="rectangle">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="#" className="rectangle">
                      <i className="fa fa-linkedin" />
                    </a>
                    <a href="#" className="rectangle">
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
};

export default Profiles;
