import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { USERAPI } from "utils/api";

import Axios from "axios";

import { auth, firebase } from "utils/firebase";

const SignupPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [errmessage, setErrmessage] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [verify, setVerify] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [imageError, setImageError] = useState("");

  const nameChangeHandler = (e) => {
    const nameValue = e.target.value;
    setUserName(nameValue);

    if (nameValue.trim() === "") {
      setErrmessage("Name cannot be empty");
    } else {
      setErrmessage("");
    }
  };

  const mobileChangeHandler = (e) => {
    const mobileValue = e.target.value;
    setMobile(mobileValue);

    if (mobileValue.length !== 10) {
      setErrmessage("Mobile number should be 10 digits");
    } else {
      setErrmessage("");
    }
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value, confirmPassword);
  };
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
    validatePassword(password, e.target.value);
  };

  const checkboxRef = useRef(null);

  const toggleCheckbox = () => {
    checkboxRef.current.checked = !checkboxRef.current.checked;
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

      const extension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        setFile(null);
        setImageError(
          "Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed."
        );
      } else {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFile(file);
          setFilePreview(reader.result);
        };

        if (file) {
          reader.readAsDataURL(file);
        }
        setFile(file);
        setImageError("");
      }
    }
  };

  // Sent OTP
  const sentOTP = () => {
    const token = localStorage.getItem("token");
    const number = "+91" + mobile;
    Axios.post(
      `${USERAPI}verifynumber`,
      { number },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        const result = response.data;
        if (result.status) {
          setfinal(result.otp);
          setshow(true);
        } else {
          setErrmessage(result.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    if (otp === final) {
      alert("otp match");
      setVerify(true);
      setshow(false);
    } else {
      alert("Wrong code");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!userName || !password || !mobile || !file) {
      setErrmessage("Please fill in all fields");
      return;
    }

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("mobile", mobile);
    formData.append("role", "CLIENT");
    formData.append("image", file);

    Axios.post(`${USERAPI}signup`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
      .then((response) => {
        const result = response.data;
        if (result.status) {
          navigate("/login");
        } else {
          setErrmessage(result.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setotp(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.target.value.length >= 6 && e.key !== "Backspace") {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  const validatePassword = (passwordValue, confirmPasswordValue) => {
    if (passwordValue === "" || confirmPasswordValue === "") {
      setPasswordError("");
    } else if (passwordValue.length < 8) {
      setPasswordError("Password should have at least 8 characters");
    } else if (!/\d/.test(passwordValue)) {
      setPasswordError("Password should contain at least one number");
    } else if (!/[a-zA-Z]/.test(passwordValue)) {
      setPasswordError("Password should contain at least one letter");
    } else if (!/[@#$%^&+=]/.test(passwordValue)) {
      setPasswordError(
        "Password should contain at least one special character"
      );
    } else if (confirmPasswordValue === "") {
      setPasswordError("");
    } else if (passwordValue !== confirmPasswordValue) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
      <form
        className="bg-cover bg-no-repeat bg-white_A700 flex flex-col font-roboto gap-[53px] items-center justify-start mx-auto p-[5%] md:p-[3%] sm:p-[2%] w-full"
        style={{
          backgroundImage: "url('/images/Signup.png')",
          backgroundSize: "cover",
          width: "100vw",
          minHeight: "100vh",
        }}
        onSubmit={submitHandler}
      >
        <img
          src="/images/LogoWhite.png"
          className="common-pointer h-12 md:h-auto ml-[1100px] sm:ml-[289px] md:ml-[640px] mt-[-15px] sm:mt-[-30px] object-cover w-[14%] md:w-[21%] sm:w-[30%]"
          alt="builddreamlow"
          onClick={() => navigate("/")}
        />
        <div className="flex flex-col items-start justify-start sm:m-[] sm:mt-[94px] w-[53%] sm:w-[95%] md:w-full">
          <div
            className="flex md:flex-col flex-row md:gap-5 items-end justify-start ml-0.5 md:ml-[0] w-[90%] md:w-full"
            style={{ marginTop: "-140px" }}
          >
            <div
              className="flex flex-col items-start justify-start sm:m-[] sm:mt-[94px] w-[53%] sm:w-[95%] md:w-full"
              style={{ padding: "75px 0px 0px 0px" }}
            >
              {errmessage ? (
                <span className="text-red-500">{errmessage}</span>
              ) : (
                ""
              )}
              {imageError && <p className="text-red-500">{imageError}</p>}
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <h5 className="text-gray_500 uppercase font-normal text-[13px]">
                Username:
              </h5>

              <div className="bg-white_A700_19 border border-gray_300 border-solid rounded-[21px] flex sm:flex-row h-[42px] sm:items-center sm:justify-around mt-2.5 md:w-[45%] sm:w-[94%] w-[353px]">
                <input
                  className=" bg-transparent border-0 md:w-[45%] p-0 sm:flex-row sm:items-center sm:justify-around sm:w-[94%] w-full"
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
              <h5 className="font-normal text-[13px] mt-[26px] text-gray_500 uppercase">
                MOBILE:
              </h5>
              <div className="bg-white_A700_19 border border-gray_300 border-solid rounded-[21px] flex h-[42px] mt-[11px] md:w-[45%] sm:w-[94%] w-[353px]">
                <input
                  className=" bg-transparent border-0 md:w-[45%] p-0 sm:w-[94%] w-full"
                  type="number"
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
              <span
                className="sm:ml-[20px]"
                style={{
                  marginLeft: "314px",
                  marginTop: "-34px",
                  marginBottom: "10px",
                  color: "white",
                }}
              >
                {!verify ? (
                  <box-icon
                    name="check-circle"
                    animation="tada"
                    color="rgba(245,245,245,0.73)"
                    onClick={sentOTP}
                  ></box-icon>
                ) : (
                  <box-icon
                    type="solid"
                    color="rgba(245,245,245,0.73)"
                    name="check-circle"
                  ></box-icon>
                )}
              </span>
              <div
                style={{
                  display: !verify && !show ? "block" : "none",
                  marginBottom: "-15px",
                  marginLeft: "26px",
                  marginTop: "13px",
                }}
              ></div>
              <div id="recaptcha-container" style={{ marginTop: "25px" }}></div>
              <div
                style={{
                  display: show ? "flex" : "none",
                  marginBottom: "-8px",
                  marginLeft: "11px",
                  marginTop: "18px",
                  width: "212px",
                  color: "white",
                  border: "1px solid",
                }}
              >
                <input
                  type="text"
                  placeholder={"ENTER"}
                  style={{
                    letterSpacing: "22px",
                    fontWeight: "900",
                    fontSize: "20px",
                    background: "transparent",
                    width: "212px",
                  }}
                  maxLength={6}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                ></input>
                <button
                  type="button"
                  style={{
                    marginLeft: "18px",
                    border: "1px solid",
                    width: "98px",
                    letterSpacing: "6px",
                    paddingLeft: "10px",
                  }}
                  onClick={ValidateOtp}
                >
                  VERIFY
                </button>
              </div>
            </div>
            <h5 className="font-normal text-[13px] md:mb-[150px] sm:mb-[50px] mb-[53px] ml-[130px] sm:ml-[] md:ml-[] md:mr-[316px] sm:mr-[68px] sm:mt-[-249px] md:mt-[-87px] mt-[95px] text-gray_500 uppercase">
              PICTURE:
            </h5>
            <label htmlFor="imageUpload">
              <div
                className="md:block flex flex-col sm:h-[100px] h-[142px] items-center justify-start sm:m-[] md:m-[] ml-14 sm:ml-[] md:ml-[] md:mr-[120px] sm:mr-[163px] sm:mt-[-130px] md:mt-[-259px] mt-[22px] p-[31px] sm:px-5 rounded-[50%] sm:w-[100px] w-[142px]"
                style={{
                  backgroundImage: `url(${
                    filePreview ? filePreview : "/images/ImageUpload.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  accept="image/*"
                  name="image"
                  onChange={handleImageUpload}
                />
              </div>
            </label>
          </div>

          <div className="flex flex-col items-start justify-start sm:m-[] sm:mt-[140px] sm:ml-[18px] w-[53%] sm:w-[95%] md:w-full sm:mt-0">
            <h5 className="text-gray_500 uppercase font-normal text-[13px]">
              PASSWORD:
            </h5>
            <div className="bg-white_A700_19 border border-gray_300 border-solid rounded-[21px] flex sm:flex-row h-[42px] sm:items-center sm:justify-around mt-2.5 md:w-[45%] sm:w-[94%] w-[353px]">
              <input
                className="bg-transparent border-0 md:w-[45%] p-0 sm:flex-row sm:items-center sm:justify-around sm:w-[94%] w-full"
                type="password"
                name="password"
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

            {/* Confirm password field */}
            <h5 className="font-normal text-[13px] mt-[26px] text-gray_500 uppercase">
              CONFIRM PASSWORD:
            </h5>
            <div className="bg-white_A700_19 border border-gray_300 border-solid rounded-[21px] flex h-[42px] mt-[11px] md:w-[45%] sm:w-[94%] w-[353px]">
              <input
                className="bg-transparent border-0 md:w-[45%] p-0 sm:w-[94%] w-full"
                type="password"
                name="confirmPassword"
                style={{
                  color: "white",
                  fontSize: "17px",
                  paddingLeft: "20px",
                }}
                value={confirmPassword}
                onChange={confirmPasswordChangeHandler}
                required
              />
            </div>
          </div>
          <div className="flex sm:flex-col flex-row sm:gap-10 items-end justify-between sm:m-[] sm:ml-[7px] mt-11 w-full">
            <div className="font-normal leading-[19.00px] mb-1 sm:ml-5 sm:mr-0.5 text-[13px] text-gray_500 text-left tracking-[0.10px]">
              <input
                className="h-3 mr-[5px] w-3 rounded-sm border border-blue_gray_100 border-solid"
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
            <button className="rounded-[18px] border border-solid border-white_A700 p-2 common-pointer cursor-pointer font-semibold min-w-[142px] sm:mr-[130px] md:mr-[15px] sm:mt-0 mt-[7px] text-[17px] text-center text-white_A700_89 uppercase">
              S I G N U P
            </button>
          </div>
          <div className="flex sm:flex-col flex-row sm:gap-5 items-end justify-start sm:m-[] sm:mb-[50px] md:ml-[0] ml-[7px] mt-[19px] w-3/5 md:w-full">
            <h6
              className="font-bold text-[11px] common-pointer font-roboto sm:m-[] sm:mb-[] sm:ml-[] sm:mr-[277px] sm:mt-[35px] my-2 text-center text-white_A700_7f uppercase"
              onClick={() => navigate("/login")}
            >
              ALREADY HAVE AN ACCOUNT ?
            </h6>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
