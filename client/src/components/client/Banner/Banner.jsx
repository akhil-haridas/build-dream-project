import React from "react";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-[491px] sm:h-[568px] m-auto w-full">
        <img
          src="images/img_image.png"
          className="h-[491px] m-auto object-cover w-full"
          alt="image"
        />
        <div className="absolute flex flex-col justify-start right-[5%] top-[18%] w-[81%]">
          <div className="bg-cover bg-no-repeat flex flex-col h-7 items-center justify-start md:ml-[0] ml-[630px] w-7"></div>
          <h1 className="leading-[67.00px] md:ml-[0] ml-[98px] mt-[92px] text-center text-white_A700 w-[67%] sm:w-full font-normal md:text-5xl sm:text-[42px] text-[56px]">
            Home Construction Guide Community
          </h1>
          <h3
            className="md:ml-[0] ml-[201px] mt-[85px] text-center text-white_A700 font-normal sm:text-[19px] md:text-[21px] text-[23px]"
            style={{ marginLeft: "-115px" }}
          >
            Find Shops · Find Professionals · Ask Queries
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;
