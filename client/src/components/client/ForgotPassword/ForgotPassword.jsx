import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";
import { USERAPI } from "utils/api";
import { auth, firebase } from "utils/firebase";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate()

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [final, setFinal] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [sucMessage, setSucMessage] = useState("");
  const [showMobile, setShowMobile] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const inputsRef = useRef([]);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

 useEffect(() => {
   let timer;
   if (countdown > 0 && resendDisabled) {
     timer = setTimeout(() => {
       setCountdown((prevCountdown) => prevCountdown - 1);
     }, 1000);
   } else if (countdown === 0 && resendDisabled) {
     setResendDisabled(false);
   }
   return () => clearTimeout(timer);
 }, [countdown, resendDisabled,showOtp]);



  const handleInputChange = (index, event) => {
    const value = event.target.value;

    // Update the OTP value
    const updatedOtp = otp.substr(0, index) + value + otp.substr(index + 1);
    setOtp(updatedOtp);

    // Move focus to the next input
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      // Delete current input value and move focus to the previous input
      setOtp(otp.substr(0, index - 1) + otp.substr(index));
      inputsRef.current[index - 1].focus();
    }
  };

  const verifyOTP = (event) => {
  
    event.preventDefault();

    if (otp === null || final === null) return;
    if (otp === final) {
     setShowOtp(false);
     setShowReset(true);
    } else {
      alert("Wrong code");
    }
    
  };

  const sentOTP = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    Axios.post(
      `${USERAPI}forgotpassword`,
      { mobile },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) => {
      const result = response.data;
      if (result.status) {
        setShowMobile(false);
        setShowOtp(true);
        setFinal(result.otp);
      } else {
        setErrMessage(result.message);
      }
    });
  };

  const handleForgotPassword = (event) => {
    event.preventDefault()
      const token = localStorage.getItem("token");
    Axios.post(
      `${USERAPI}resetpass`,
      { password, mobile },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) => {
      const result = response.data.userRESET;
      if (result.status) {
        setSucMessage("Password changed successfully!");
        navigate("/login");
      } else {
        setErrMessage(result.message);
      }
    });
  };

  return (
    <>
      <Helmet>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </Helmet>
      {showMobile && (
        <div className="container padding-bottom-3x mb-2">
          <div className="row justify-content-center align-items-center vh-100 vw-100">
            <div className="col-lg-8 col-md-10">
              <h2>Forgot your password?</h2>
              <p>
                Change your password in three easy steps. This helps to keep
                your new password secure.
              </p>
              <ol className="list-unstyled">
                <li>
                  <span className="text-primary text-medium">1. </span>Fill in
                  mobile number below.
                </li>
                <li>
                  <span className="text-primary text-medium">2. </span>We'll
                  sent you a temporary code.
                </li>
                <li>
                  <span className="text-primary text-medium">3. </span>Use the
                  code to change your password on our secure website.
                </li>
              </ol>
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
              <div id="recaptcha-container"></div>
              <form className="card mt-4" onSubmit={sentOTP}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="email-for-pass">
                      Enter your mobile number
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter your mobile number"
                      id="email-for-pass"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      maxLength={10}
                      required
                    />
                    <small className="form-text text-muted">
                      Type in the mobile number you used when you registered.
                      Then we'll sent a code to this number.
                    </small>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn" type="submit">
                    Send OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showOtp && (
        <div className="container">
          <br />
          <div className="row">
            <div className="col-lg-5 col-md-7 mx-auto my-auto">
              <div className="card">
                <div className="card-body px-lg-5 py-lg-5 text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    className="rounded-circle ml-[6rem] avatar-lg img-thumbnail mb-4"
                    alt="profile-image"
                  />
                  <h2 className="text-info">2FA Security</h2>
                  <p className="mb-4">
                    Enter 6-digit code from your authentication app.
                  </p>
                  <form>
                    <div className="row mb-4">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div className="col-lg-2 col-md-2 col-2" key={index}>
                          <input
                            ref={(ref) => (inputsRef.current[index] = ref)}
                            type="text"
                            className="form-control text-lg text-center"
                            placeholder="_"
                            aria-label="2fa"
                            maxLength={1}
                            onChange={(e) => handleInputChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn bg-info btn-lg my-4"
                        onClick={verifyOTP}
                      >
                        Continue
                      </button>
                    </div>
                    <div className="text-center">
                      {resendDisabled ? (
                        <p>Resend in {countdown}s</p>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={sentOTP}
                          disabled={resendDisabled}
                        >
                          Resend
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showReset && (
        <div className="container padding-bottom-3x mb-2">
          <div className="row justify-content-center align-items-center vh-100 vw-100">
            <div className="col-lg-8 col-md-10">
              <h2>Forgot your password?</h2>
              <p>
                Change your password in three easy steps. This helps to keep
                your new password secure.
              </p>
              <ol className="list-unstyled">
                <li>
                  <span className="text-primary text-medium">1. </span>Fill in
                  your mobile number address below.
                </li>
                <li>
                  <span className="text-primary text-medium">2. </span>We'll
                  sent you a temporary code.
                </li>
                <li>
                  <span className="text-primary text-medium">3. </span>Use the
                  code to change your password on our secure website.
                </li>
              </ol>
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
              <form className="card mt-4" onSubmit={handleForgotPassword}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="email-for-pass">
                      Enter your new password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="email-for-pass">
                      Confirm your new password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <small className="form-text text-muted">
                      Type your new secure password and confirm it. Then click
                      the submit button to change it.
                    </small>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn" type="submit">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
