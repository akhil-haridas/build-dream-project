import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { SHOPAPI } from "utils/api.js";

import Axios from "axios";

const ShopSignup = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errmessage, setErrmessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [data, setData] = useState([]);

  const handleExpertiseChange = (event) => {
    setSelectedExpertise(event.target.value);
  };
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  const nameChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const mobileChangeHandler = (e) => {
    setMobile(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const checkboxRef = useRef(null);

  const toggleCheckbox = () => {
    checkboxRef.current.checked = !checkboxRef.current.checked;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${SHOPAPI}getcategories`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("location", mobile);
    formData.append("email", email);
    formData.append("role", "SHOP");
    formData.append("district", selectedType);
    formData.append("category", selectedExpertise);
    const token = localStorage.getItem("token");
    Axios.post(`${SHOPAPI}signup`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        const result = response.data;
        console.log(result);
        if (result.status) {
          navigate("/shop/login");
        } else {
          setErrmessage(result.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form
        className="bg-cover bg-no-repeat bg-white_A700 flex flex-col font-roboto gap-[53px] h-[616px] items-center justify-start mx-auto p-[52px] md:px-10 sm:px-5 w-full"
        style={{
          backgroundImage: "url('/images/Signup.png')",
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
        }}
        onSubmit={submitHandler}
      >
        <img
          src="/images/LogoWhite.png"
          className="common-pointer h-12 md:h-auto ml-[1100px] sm:ml-[289px] md:ml-[640px] mt-[-15px] sm:mt-[-30px] object-cover w-[14%] md:w-[21%] sm:w-[30%]"
          alt="builddreamlow"
          onClick={() => navigate("/")}
        />
        <div className="flex flex-col items-start justify-start sm:mb-5 mt-[-25px] md:mt-[-40px] w-[65%] md:w-[90%] sm:w-full">
          <div className="flex md:flex-col flex-row md:gap-5 items-end justify-start ml-0.5 md:ml-[0] w-[90%] md:w-full">
            <div className="flex flex-col items-start justify-start sm:m-[] sm:mt-[94px] w-[53%] sm:w-[95%] md:w-full">
              {errmessage ? (
                <span style={{ color: "yellow" }}>{errmessage}</span>
              ) : (
                ""
              )}
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <h5 className="text-gray_500 uppercasefont-normal text-[13px]">
                Name:
              </h5>

              <div className="bg-white_A700_19 border border-gray_300 border-solid rounded-[21px] flex sm:flex-row h-[42px] sm:items-center sm:justify-around mt-2.5 md:w-[45%] sm:w-[94%] w-[353px]">
                <input
                  className="md:w-[45%] p-0 sm:flex-row sm:items-center sm:justify-around sm:w-[94%] w-full bg-transparent border-0"
                  type="text"
                  name="rectangle_Two"
                  style={{
                    color: "white",
                    fontSize: "17px",
                    paddingLeft: "20px",
                  }}
                  value={userName}
                  onChange={nameChangeHandler}
                  required
                />
              </div>
              <div style={{ marginLeft: "411px", marginTop: "-69px" }}>
                <h5 className="text-gray_500 uppercase font-normal text-[13px]">
                  Category:
                </h5>
                <select
                  className="md:w-[45%] p-0 sm:flex-row sm:items-center sm:justify-around sm:w-[94%] w-full bg-transparent border-1 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  name="rectangle_Two"
                  style={{
                    width: "350px",
                    height: "42px",
                    marginBottom: "0px",
                    marginTop: "12px",
                    borderRadius: "21px",
                    paddingLeft: "30px",
                    color: "white",
                  }}
                  value={selectedExpertise}
                  onChange={handleExpertiseChange}
                >
                  <option value="">Select Category</option>
                  {data.map((expertise, index) => (
                    <option key={index} value={expertise}>
                      {expertise}
                    </option>
                  ))}
                </select>
              </div>

              <h5 className="font-normal text-[13px] mt-[26px] text-gray_500 uppercase">
                Location:
              </h5>
              <div className="bg-white_A700_19 border border-gray_300 border-solid rounded-[21px] flex h-[42px] mt-[11px] md:w-[45%] sm:w-[94%] w-[353px]">
                <input
                  className="bg-transparent border-0 md:w-[45%] p-0 sm:w-[94%] w-full"
                  type="text"
                  name="rectangle_Two"
                  style={{
                    color: "white",
                    fontSize: "17px",
                    paddingLeft: "20px",
                  }}
                  value={mobile}
                  onChange={mobileChangeHandler}
                  required
                />
              </div>
              <div style={{ marginLeft: "411px", marginTop: "-69px" }}>
                <h5 className="text-gray_500 uppercase font-normal text-[13px]">
                  District:
                </h5>
                <select
                  className="md:w-[45%] p-0 sm:flex-row sm:items-center sm:justify-around sm:w-[94%] w-full bg-transparent border-1 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  name="rectangle_Two"
                  style={{
                    width: "350px",
                    height: "42px",
                    marginBottom: "0px",
                    marginTop: "12px",
                    borderRadius: "21px",
                    paddingLeft: "30px",
                    color: "white",
                  }}
                  value={selectedType}
                  onChange={handleTypeChange}
                >
                  <option>Select your district</option>
                  <option>THIRUVANATHAPURAM</option>
                  <option>KOLLAM</option>
                  <option>PATHANAMTHITTA</option>
                  <option>ALAPPUAHA</option>
                  <option>KOTTAYAM</option>
                  <option>IDUKKI</option>
                  <option>ERANAKULAM</option>
                  <option>THRISSUR</option>
                  <option>PALAKKAD</option>
                  <option>MALAPPURAM</option>
                  <option>KOZHIKODE</option>
                  <option>WAYANAD</option>
                  <option>KANNUR</option>
                  <option>KASARGODE</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center sm:items-stretch justify-between sm:justify-start sm:m-[] md:m-[] ml-0.5 md:ml-[0] sm:ml-[22px] sm:mt-[150px] mt-[26px] md:mt-[35px] sm:w-[116%] w-[71%] md:w-full">
            <h5 className="font-normal text-[13px] sm:m-[] sm:mb-[] sm:ml-[0] sm:mt-[53px] text-gray_500 uppercase">
              EMAIL:
            </h5>
            <h5
              className=" font-normal text-[13px] sm:ml-[-72px] mr-[0] md:mr-[249px] sm:mr-[] sm:mt-36 text-gray_500 uppercase"
              style={{ marginRight: "60px" }}
            >
              PASSWORD:
            </h5>
          </div>
          <div className="md:block flex md:flex-col flex-row md:gap-10 items-center justify-between ml-0.5 md:ml-[0] mt-[11px] w-full">
            <div className="bg-white_A700_19 border border-gray_300 border-solid rounded-[21px] md:block flex sm:flex-row h-[42px] sm:items-start sm:justify-between sm:m-[] md:m-[] md:ml-[419px] sm:ml-px md:mr-[0] sm:mt-[-89px] w-[353px] md:w-[45%] sm:w-[90%]">
              <input
                className="bg-transparent border-0 md:block md:h-[42px] md:ml-[419px] md:mr-[0] md:w-[45%] p-0 sm:block sm:flex-row sm:h-[42px] sm:items-start sm:justify-between sm:ml-px sm:mt-[-89px] sm:w-[90%] w-full"
                type="email"
                name="rectangle_Two"
                style={{
                  color: "white",
                  fontSize: "17px",
                  paddingLeft: "20px",
                }}
                value={email}
                onChange={emailChangeHandler}
                required
              />
            </div>
            <div className="bg-white_A700_19 border border-gray_300 border-solid rounded-[21px] md:block flex sm:flex-row h-[42px] sm:items-start sm:justify-between sm:m-[] md:m-[] md:ml-[419px] sm:ml-px md:mr-[0] sm:mt-[-89px] w-[353px] md:w-[45%] sm:w-[90%]">
              <input
                className="bg-transparent border-0 block md:mr-[-520px] md:mt-[-42px] md:w-[45%] p-0 sm:mt-7 sm:w-[90%] w-full"
                type="password"
                name="rectangle_Three"
                style={{
                  color: "white",
                  fontSize: "17px",
                  paddingLeft: "20px",
                }}
                value={password}
                onChange={passwordChangeHandler}
                required
              />
            </div>
          </div>
          <div className="flex sm:flex-col flex-row sm:gap-10 items-end justify-between sm:m-[] sm:ml-[-21px] mt-11 w-full">
            <div className="font-normal  leading-[19.00px] mb-1 sm:ml-5 sm:mr-0.5 text-[13px] text-gray_500 text-left tracking-[0.10px]">
              <input
                className="border border-blue_gray_100 border-solid rounded-sm h-3 mr-[5px] w-3"
                ref={checkboxRef}
                type="checkbox"
                name="iagreetheterms"
                id="iagreetheterms"
                required
                style={{
                  background: "transparent",
                  border: "none",
                  marginTop: "-10px",
                }}
              />
              <span></span>
              <label htmlFor="iagreetheterms" onClick={toggleCheckbox}>
                I agree to the terms of Service and acknowledge the privacy
                policy
              </label>
            </div>
            <button className="border border-solid border-white_A700 rounded-[18px] p-2 common-pointer cursor-pointer font-semibold min-w-[142px] sm:mr-[130px] md:mr-[15px] sm:mt-0 mt-[7px] text-[17px] text-center text-white_A700_89 uppercase">
              S I G N U P
            </button>
          </div>
          <div className="flex sm:flex-col flex-row sm:gap-5 items-end justify-start sm:m-[] sm:mb-[50px] md:ml-[0] ml-[7px] mt-[19px] w-3/5 md:w-full">
            <h6
              className="font-bold text-[11px] common-pointer font-roboto sm:m-[] sm:mb-[] sm:ml-[] sm:mr-[277px] sm:mt-[35px] my-2 text-center text-white_A700_7f uppercase"
              onClick={() => navigate("/shop/login")}
              style={{ cursor: "pointer" }}
            >
              ALREADY HAVE AN ACCOUNT ?
            </h6>
          </div>
        </div>
      </form>
    </>
  );
};

export default ShopSignup;
