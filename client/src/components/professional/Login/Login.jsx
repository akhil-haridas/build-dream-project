import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Axios from "axios";

import { PROFESSIONALAPI } from "utils/api";

import { useDispatch } from "react-redux";

import { professionalActions } from "store/professionalAuth";

import { Modal } from "react-bootstrap";

import { auth, firebase } from "utils/firebase";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrmessage] = useState("");
  const [sucMessage, setSucMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showReset, setReset] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const [final, setfinal] = useState("");
  const [newpass, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showQuote, setShowQuote] = useState(true);

  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);

  const handleModalClose = () => {
    setShowModal(false);
    setShowQuote(true);
  };

  const handleModalOpen = () => {
    setShowModal(true);
    setShowQuote(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    Axios.post(
      `${PROFESSIONALAPI}login`,
      { email, password },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) => {
      const result = response.data.userLOGIN;
      if (result.status) {
        if (result.plan) {
          dispatch(
            professionalActions.professionalAddDetails({
              name: result.name,
              token: result.token,
              role: result.role,
              id: result.id,
            })
          );
          navigate("/professional");
        } else {
          removeCookie("jwt");
          dispatch(professionalActions.professionalLogout());

          navigate(`/professional/subscription/${result.id}`);
        }
      } else {
        setErrmessage(result.message);
      }
    });
  };

  // Sent OTP
  const sentOTP = () => {
    if (mobile === "" || mobile.length < 10) return;
    const number = "+91" + mobile;
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(number, verify)
      .then((result) => {
        setVerify(true);
        setfinal(result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        setShowModal(false);
        setReset(true);
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  const handleForgotPassword = () => {
    const token = localStorage.getItem("token");
    Axios.post(
      `${PROFESSIONALAPI}resetpass`,
      { newpass, mobile },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) => {
      const result = response.data.userRESET;
      if (result.status) {
        setReset(false);
        setShowQuote(true);
        setSucMessage("Password changed successfully!");
      } else {
        setErrmessage(result.message);
      }
    });
  };
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        style={{
          marginTop: "-450px",
          marginLeft: "140px",
          border: "1px solid",
          borderColor: "white",
          width: "280px",
          height: "280px",
          backdropFilter: "blur(3px)",
        }}
      >
        {" "}
        <button
          onClick={handleModalClose}
          style={{ marginRight: "12px", float: "right", marginTop: "-1px" }}
        >
          <box-icon
            name="x-circle"
            type="solid"
            animation="tada"
            color="#ffffff"
          ></box-icon>
        </button>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: "20px",
              color: "white",
              marginTop: "19px",
              marginLeft: "28px",
            }}
          >
            Forgot Password ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="number"
            placeholder="Enter your mobile number"
            style={{
              background: "transparent",
              border: "1px solid",
              borderColor: "white",
              marginLeft: "24px",
              width: "230px",
              color: "white",
              textAlign: "center",
              marginTop: "4px",
            }}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            maxLength={10}
          />
          <button
            style={{
              color: "white",
              border: "1px solid",
              borderColor: "white",
              width: "90px",
              marginLeft: "100px",
              height: "25px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={sentOTP}
          >
            GET OTP
          </button>
          <input
            type="number"
            placeholder="Enter your otp"
            style={{
              background: "transparent",
              border: "1px solid",
              borderColor: "white",
              marginLeft: "24px",
              width: "230px",
              color: "white",
              textAlign: "center",
            }}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={ValidateOtp}
            style={{
              color: "white",
              border: "1px solid",
              borderColor: "white",
              width: "90px",
              marginLeft: "100px",
              height: "25px",
              marginTop: "20px",
            }}
          >
            SUBMIT
          </button>
        </Modal.Footer>
        <div
          id="recaptcha-container"
          style={{
            marginTop: "35px",
            marginLeft: "-11px",
            display: !verify ? "block" : "none",
          }}
        ></div>
      </Modal>
      <Modal
        show={showReset}
        style={{
          marginTop: "-450px",
          marginLeft: "140px",
          border: "1px solid",
          borderColor: "white",
          width: "280px",
          height: "280px",
          backdropFilter: "blur(3px)",
        }}
      >
        {" "}
        <button
          style={{ marginRight: "12px", float: "right", marginTop: "-1px" }}
        ></button>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: "20px",
              color: "white",
              marginTop: "19px",
              marginLeft: "28px",
            }}
          >
            Reset Password !
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title
            style={{
              fontSize: "12px",
              color: "white",
              marginLeft: "25px",
              marginBottom: "10px",
            }}
          >
            Enter New Password
          </Modal.Title>
          <input
            type="password"
            style={{
              background: "transparent",
              border: "1px solid",
              borderColor: "white",
              marginLeft: "24px",
              width: "230px",
              color: "white",
              textAlign: "center",
              marginTop: "4px",
            }}
            value={newpass}
            onChange={(e) => setNew(e.target.value)}
            maxLength={10}
          />
          <Modal.Title
            style={{
              fontSize: "12px",
              color: "white",
              marginTop: "14px",
              marginLeft: "25px",
              marginBottom: "9px",
            }}
          >
            Confirm New Password
          </Modal.Title>
          <input
            type="password"
            style={{
              background: "transparent",
              border: "1px solid",
              borderColor: "white",
              marginLeft: "24px",
              width: "230px",
              color: "white",
              textAlign: "center",
              marginTop: "4px",
            }}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            maxLength={10}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            variant="primary"
            onClick={handleForgotPassword}
            style={{
              color: "white",
              border: "1px solid",
              borderColor: "white",
              width: "90px",
              marginLeft: "100px",
              height: "25px",
              marginTop: "20px",
            }}
          >
            SUBMIT
          </button>
        </Modal.Footer>
      </Modal>

      <form
        className="bg-cover bg-no-repeat bg-white_A700 flex flex-col sm:gap-10 md:gap-10 gap-[98px] h-[616px] justify-start mx-auto p-8 sm:px-5 shadow-bs1 w-full"
        style={{
          backgroundImage: "url('/images/Login.png')",
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
            {sucMessage ? (
              <span style={{ color: "green" }}>{sucMessage}</span>
            ) : (
              ""
            )}
            <input
              className="text-white uppercase bg-transparent border-none outline-none placeholder-white_A700_b2"
              type="email"
              style={{ width: "100%", letterSpacing: "2px" }}
              placeholder="ENTER YOUR EMAIL "
              value={email}
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
                onClick={handleModalOpen}
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
        {showQuote ? (
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
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default LoginPage;
