import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Axios from "axios";

import { USERAPI } from "utils/api";

import { useDispatch } from "react-redux";

import { clientActions } from "store/clientAuth.js";


const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
   const [errMessage, setErrmessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    Axios.post(
      `${USERAPI}login`,
      { mobileNumber, password },
      { withCredentials: true }
    ).then((response) => {
      const result = response.data.userLOGIN;
      if (result.status) {
        console.log(result);
        dispatch(
          clientActions.clientAddDetails({
            name: result.name,
            token: result.token,
            role: result.role,
            id:result.id
          })
        );
        navigate("/");
      } else {
        setErrmessage(result.message);
      }
    });
  };

  
  return (
    <>
      <form
        className="bg-cover bg-no-repeat bg-white_A700 flex flex-col sm:gap-10 md:gap-10 gap-[98px] h-[616px] justify-start mx-auto p-8 sm:px-5 shadow-bs1 w-full"
        style={{
          backgroundImage:
            "url('/images/Login.png')",
        }}
        onSubmit={submitHandler}
      >
        <div className="flex flex-col font-rubik md:gap-10 gap-[117px] items-end md:m-[] sm:ml-[0] md:ml-[61px] ml-[63px] md:mt-[30px] mt-[7px] sm:pl-5 pl-[471px] md:px-5 w-[95%] md:w-full">
          <img
            src="/images/LogoWhite.png"
            className="sm:block h-[52px] md:h-auto sm:m-[] md:m-[] sm:ml-[] md:ml-[] sm:mr-2.5 md:mr-[60px] md:mt-[-14px] sm:mt-[-5px] object-cover md:w-[26%] w-[28%] sm:w-[35%]"
            alt="builddreamlow"
            onClick={() => navigate("/")}
          />

          <div className="md:block flex flex-col items-start justify-start md:justify-start sm:m-[] md:m-[] md:mb-[] sm:ml-[] md:mr-[205px] sm:mr-[26px] mr-[291px] md:mt-[30px] sm:mt-[31px] w-[58%] md:w-[65%] sm:w-[90%]">
            {errMessage ? (
              <span style={{ color: "red" }}>{errMessage}</span>
            ) : (
              ""
            )}
            <input
              className="text-white uppercase bg-transparent border-none outline-none placeholder-white_A700_b2"
              type="number"
              style={{ width: "100%", letterSpacing: "2px" }}
              placeholder="ENTER YOUR MOBILE NUMBER"
              value={mobileNumber}
              required
              autoComplete="off"
              onChange={(e) => setMobileNumber(e.target.value)}
            />

            <div className="bg-white_A700_b2 h-0.5 sm:m-[]  md:w-[99%] w-full" />
            <input
              className="text-white uppercase bg-transparent border-none outline-none placeholder-white_A700_b2"
              type="password"
              style={{ marginTop: "30px", width: "100%", letterSpacing: "2px" }}
              placeholder="ENTER YOUR PASSWORD"
              value={password}
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="bg-white_A700_b2 h-0.5 sm:m-[] sm:mt-[] md:w-[99%] w-full" />
            <div className="flex flex-row font-roboto items-center justify-between mt-[19px] w-full">
              <h6
                className="text-center text-white_A700_b2 uppercase font-bold text-[11px]"
                onClick={()=>navigate('/forgotpassword')}
              >
                FORGOT PASSWORD ?
              </h6>
              <h6
                className="common-pointer md:m-[] md:ml-[] text-center text-white_A700_b2 uppercase font-bold text-[11px]"
                onClick={() => navigate("/signup")}
              >
                create an account ?
              </h6>
            </div>
            <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start mt-8 w-full">
              <button
                className="border border-solid border-white_A700_b2 text-white_A700_b2 cursor-pointer font-roboto font-semibold min-w-[142px] p-2 ml-[120px] sm:ml-[130px] md:ml-[232px] sm:mt-[-130px] pt-2 text-[17px] text-center text-white_A700_b2 uppercase rounded-[18px]"
                variant="OutlineWhiteA700b2"
              >
                L o g i n
              </button>
            </div>
          </div>
        </div>
          <div
            style={{
              marginTop: "-445px",
              marginLeft: "90px",
              border: "none",
              width: "300px",
              height: "390px",
              color: "transparent",
              textAlign: "center",
              letterSpacing: "2px",
            }}
          >
            <h2
              style={{
                fontSize: "50px",
                WebkitTextStroke: "1.5px",
                lineHeight: "65px",
                WebkitTextStrokeColor: "#8b8b8be0",
                fontWeight: "900",
              }}
            >
              " HOME IS THE STARTING PLACE OF LOVE, HOPE AND DREAMS. "
            </h2>
          </div>
      </form>
    </>
  );
};

export default LoginPage;
