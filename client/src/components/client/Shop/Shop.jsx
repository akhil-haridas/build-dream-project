import React from "react";
import "./Shop.css";
import Axios from "axios";
import { USERAPI, imageAPI } from "utils/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Shop = ({ data }) => {
  const user = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const connectPro = (id, type) => {
    const token = localStorage.getItem("token");
    const userId = id;
    const userType = type;
    Axios.post(
      `${USERAPI}chat`,
      { userId, userType },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) => {
      const chatId = response.data._id;
      console.log(chatId, "chatId");
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
                <img src={`${imageAPI}${data.image}`} alt="" />
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 wow fadeInRight">
              <h1 className="fw-light">{data.name}</h1>
              <h5 className="fg-theme mb-3">{data.category}</h5>
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
                  {data.businessType ? data.businessType : "Not available"}
                </li>
                <li>
                  <b>Location:</b> {data.location},{data.district}
                </li>
              </ul>
              <button
                className="dwbtn btn-theme-outline"
                onClick={() => connectPro(data._id, "Shop")}
                disabled={!user}
              >
                Connect us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
