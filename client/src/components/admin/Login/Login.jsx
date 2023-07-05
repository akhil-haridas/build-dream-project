import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAPI } from "utils/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adminActions } from "store/adminAuth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [Errmessage, setErrmessage] = useState("");

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setEmailIsValid(
      validateEmail(event.target.value) || event.target.value.trim() === ""
    );
    setFormIsValid(
      validateEmail(event.target.value) && enteredPassword.trim() !== ""
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setPasswordIsValid(event.target.value.trim() !== "");
    setFormIsValid(
      validateEmail(enteredEmail) && event.target.value.trim() !== ""
    );
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const submitHandler = (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    axios
      .post(
        `${AdminAPI}login`,
        { enteredEmail, enteredPassword },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const result = response.data.userLOGIN;

        if (result.status) {
          dispatch(
            adminActions.adminAddDetails({
              name: result.name,
              token: result.token,
              role: result.role,
            })
          );
            localStorage.setItem("name", result.name);
            localStorage.setItem("token", result.token);
            localStorage.setItem("role", result.role);
          navigate("/admin");
        } else {
          setErrmessage(result.message);
        }
      })
      .catch((err) => {
         navigate("/server-error");
        console.log(err.message, "ERROR");
      });
  };
  return (
    <form
      onSubmit={submitHandler}
      className="bg-black_900 flex flex-col font-poppins gap-[54px] items-center justify-start mx-auto p-[157px] md:px-10 sm:px-5 w-full"
      style={{ background: "black", height: "100vh" }}
    >
      <h2 className="md:text-2xl sm:text-[22px] text-[26px] font-normal text-white_A700">
        A D M I N
      </h2>
      {Errmessage && <div style={{ color: "red" }}>{Errmessage}</div>}
      <div className="flex flex-col gap-[19px] items-center justify-start mb-[34px] w-[37%] md:w-full">
        {!emailIsValid && (
          <p style={{ color: "red" }}>Please enter a valid email address.</p>
        )}
        <input
          type="email"
          className="bg-white_A700_19 h-[45px] rounded-[22px] w-full"
          style={{ paddingLeft: "40px", color: "white" }}
          placeholder="Enter email"
          value={enteredEmail}
          required
          onChange={emailChangeHandler}
          autoComplete="off"
        />
        {!passwordIsValid && (
          <p style={{ color: "red" }}>Please enter a password.</p>
        )}
        <input
          type="password"
          className="bg-white_A700_19 h-[45px] rounded-[22px] w-full"
          style={{ paddingLeft: "40px", color: "white" }}
          placeholder="Enter password"
          value={enteredPassword}
          required
          onChange={passwordChangeHandler}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!formIsValid}
          style={{ paddingLeft: "45px", paddingTop: "6px", cursor: "pointer" }}
          className="md:text-2xl sm:text-[22px] text-[26px] bg-white_A700_b2 font-semibold h-[45px] justify-center sm:px-5 px-[35px] py-0.5 rounded-[22px] text-black_900_e2 w-[350px]"
        >
          L O G I N
        </button>
      </div>
    </form>
  );
};

export default Login;
