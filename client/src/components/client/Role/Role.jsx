import React, { useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";

const RolePage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showSignup, setShowSignup] = useState("");

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const isRoleSelected = (role) => {
    return selectedRole === role;
  };

  const handleNext = () => {
    if (selectedRole) {
      setShowSignup(selectedRole);
    }
  };

  return (
    <>
      <div className="bg-white_A700 flex flex-col font-roboto items-center justify-start mx-auto w-full">
        {showSignup === "CLIENT" ? (
          <Navigate to={"/signup/client"} />
        ) : showSignup === "PROFESSIONAL" ? (
          <Navigate to={"/professional/signup"} />
        ) : showSignup === "SHOP" ? (
          <Navigate to={"/shop/signup"} />
        ) : (
          <div
            className="bg-cover bg-no-repeat bg-white_A700 flex flex-col h-[616px] items-end sm:items-start justify-end sm:justify-start p-[35px] sm:px-5 shadow-bs1 w-full"
            style={{ backgroundImage: "url('/images/Role.png')" }}
          >
            <div className="flex flex-col items-start justify-start sm:m-[] sm:mb-3.5 mr-1 mt-[17px] md:px-5 w-[92%] md:w-full">
              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-[99%] md:w-full">
                <h1 className="font-bold sm:text-[21px] mt-[70px] md:text-[23px] text-[25px] sm:m-[] md:m-[] md:mb-[-77px] md:mr-[367px] sm:mt-[45px] md:mt-[] text-blue_gray_100_cc text-center tracking-[6.00px] uppercase sm:w-[451px]">
                  What best describeS you...
                </h1>
                <img
                  src="/images/LogoWhite.png"
                  className="common-pointer h-[110px] md:h-auto sm:m-[] md:m-[] md:mb-1 sm:ml-[260px] md:ml-[721px] sm:mt-[-140px] md:mt-[] object-cover md:w-40 sm:w-[162px]"
                  alt="builddreamlow"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="flex sm:flex-col flex-row sm:gap-20 md:gap-5 items-center md:justify-around sm:justify-between justify-start mt-[90px] w-[92%] md:w-full">
                <div
                  className="bg-white_A700_7f flex flex-col md:h-[150px] h-[201px] items-center justify-start p-10 sm:px-5 rounded-[100px] md:w-[150px] w-[201px]"
                  onClick={() => handleRoleSelection("CLIENT")}
                  style={
                    isRoleSelected("CLIENT")
                      ? {
                          borderWidth: "6px",
                          background: "#1e5db140",
                          cursor: "pointer",
                        }
                      : { cursor: "pointer" }
                  }
                >
                  <img
                    src="images/img_image1.png"
                    className="h-[104px] md:h-auto mb-[13px] mt-1 object-cover sm:w-[70%] w-full"
                    alt="imageOne"
                  />
                </div>
                <div
                  className="bg-white_A700_7f flex flex-col md:h-[150px] h-[201px] items-center justify-center sm:ml-[0] ml-[232px] p-[45px] md:px-10 sm:px-5 rounded-[100px] md:w-[150px] w-[201px]"
                  onClick={() => handleRoleSelection("PROFESSIONAL")}
                  style={
                    isRoleSelected("PROFESSIONAL")
                      ? {
                          borderWidth: "6px",
                          background: "#1e5db140",
                          cursor: "pointer",
                        }
                      : { cursor: "pointer" }
                  }
                >
                  <img
                    src="images/img_image2.png"
                    className="h-[98px] md:h-auto my-1.5 object-cover sm:w-3/4 w-full"
                    alt="imageTwo"
                  />
                </div>
                <div
                  className="bg-white_A700_7f flex flex-col md:h-[150px] h-[201px] items-start justify-center sm:ml-[0] ml-[186px] p-[47px] md:px-10 sm:px-5 rounded-[100px] md:w-[150px] w-[201px]"
                  style={
                    isRoleSelected("SHOP")
                      ? {
                          borderWidth: "6px",
                          background: "#1e5db140",
                          cursor: "pointer",
                        }
                      : { cursor: "pointer" }
                  }
                  onClick={() => handleRoleSelection("SHOP")}
                >
                  <img
                    src="images/img_image3.png"
                    className="h-[98px] md:h-auto sm:m-[] sm:ml-7 my-1 object-cover w-[98px]"
                    alt="imageThree"
                  />
                </div>
              </div>
              <div className="sm:block flex sm:flex-col flex-row md:gap-5 items-center md:items-end sm:items-stretch md:justify-around sm:justify-between justify-start md:ml-[0] ml-[3px] mt-[37px] w-[95%] md:w-full">
                <h2 className="font-bold text-lg sm:m-[] sm:mt-[-574px] text-center text-white_A700_dd tracking-[2.00px] uppercase">
                  i need a home
                </h2>
                <h2 className="font-bold text-lg sm:m-[] sm:ml-[0] ml-[210px] sm:mt-[254px] text-center text-white_A700_dd tracking-[2.00px] uppercase">
                  i’m a Service provider
                </h2>
                <h2 className="font-bold text-lg sm:m-[] ml-32 sm:ml-[0] sm:mt-[260px] text-center text-white_A700_dd tracking-[2.00px] uppercase">
                  i’m a Material supplier
                </h2>
              </div>
              <button
                className="border border-solid border-white_A700 common-pointer rounded-[18px] p-2 md:block cursor-pointer font-semibold sm:m-[] md:m-[] sm:mb-[70px] md:mb-[] min-w-[142px] sm:ml-[150px] md:ml-[700px] ml-[970px] mt-[90px] text-[17px] text-center text-white_A700 uppercase"
                onClick={handleNext}
              >
                N E X T
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RolePage;
