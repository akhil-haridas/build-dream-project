import React from "react";
import "./Professional.css";
import Axios from "axios";
import { USERAPI, imageAPI } from "utils/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Professional = ({ data }) => {
  const user = useSelector((state) => state?.user?.userName);

  const navigate = useNavigate();
const connectPro = (id, type) => {
  const userId = id;
  const userType = type;
  const token = localStorage.getItem("token");

  Axios.post(
    `${USERAPI}chat`,
    { userId, userType },
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then((response) => {
    const chatId = response.data._id;
    localStorage.setItem("selectedChatID", chatId);
    navigate("/chat");
  });
};

  return (
    <div className="theme-red">
      <div className="vg-page page-about sm:pb-[20px]" id="about">
        <div className="py-5">
          <div className="row sm:ml-[35px]">
            <div className="col-lg-4 sm:w-[83%] py-3">
              <div className="img-place wow fadeInUp">
                <img
                  src={`${imageAPI}${data.image}`}
                  alt="profile photo"
                />
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 wow fadeInRight">
              <h1 className="fw-light">{data.name}</h1>
              <h5 className="fg-theme mb-3">{data.expertise}</h5>
              <p className="text-muted">{data.bio}</p>
              <ul className="theme-list">
                <li>
                  <b>Mobile:</b>{" "}
                  {data.mobile ? +91 + data.mobile : `${"Not available"}`}
                </li>
                <li>
                  <b>Email:</b> {data.email}
                </li>
                <li>
                  <b>Company:</b>{" "}
                  {data.employmentType == undefined
                    ? data.employmentType
                    : "Not available"}
                </li>
                <li>
                  <b>Location:</b> {data.location},{data.district}
                </li>
              </ul>
              <button
                className="dwbtn btn-theme-outline"
                onClick={() => connectPro(data._id, "Professional")}
                disabled={!user}
              >
                Connect Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Professional;
