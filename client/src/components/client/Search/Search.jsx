import React from 'react'

const Search = () => {
  return (
    <div
      className="bg-gray_50 sm:flex-col flex-row gap-[30px] grid md:grid-cols-1 grid-cols-2 justify-center max-w-[1263px] mx-auto p-8 md:px-5 w-full"
      orientation="horizontal"
    >
      {/* ...content... */}
      <div className="bg-white_A700 border border-black_900_1f border-solid flex flex-1 flex-col items-center justify-start p-[25px] sm:px-5 rounded-[16px] w-full">
        <div className="flex sm:flex-col flex-row sm:gap-[58px] items-center justify-between mb-1 w-[98%] md:w-full">
          <img
            src="images/img_image_128x128.png"
            className="h-32 md:h-auto object-cover w-32"
            alt="image"
          />
          <div
            className="flex flex-col  items-start justify-start"
            style={{ marginLeft: "35px" }}
          >
            <h5 className="leading-[24.00px] text-gray_900 w-[67%] sm:w-full font-normal text-[19px]">
              Explore the worthiest Shops
            </h5>
            <h6 className="leading-[24.00px] mt-[11px] text-gray_900 w-full font-normal text-base">
              Select your dream products or find the best for your Home.
            </h6>
            <div className="flex flex-row gap-4 items-start justify-start mt-[15px] w-[59%] md:w-full">
              <h4 className="text-orange_A700 font-normal text-xl">
                Start Exploring
              </h4>
              <img
                src="images/img_arrowright.svg"
                className="h-4 mt-0.5 w-4 mt-[7px]"
                alt="arrowright"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white_A700 border border-black_900_1f border-solid flex flex-1 flex-col items-center justify-start p-[25px] sm:px-5 rounded-[16px] w-full">
        <div className="flex sm:flex-col flex-row sm:gap-[58px] items-center justify-between mb-1 w-[98%] md:w-full">
          <img
            src="images/img_image_1.png"
            className="h-32 md:h-auto object-cover w-32"
            alt="image"
          />
          <div
            className="flex flex-col  items-start justify-start"
            style={{ marginLeft: "35px" }}
          >
            <h5 className="leading-[24.00px] text-gray_900 w-[67%] sm:w-full font-normal text-[19px]">
              Find Professionals
            </h5>
            <h6 className="leading-[24.00px] mt-[11px] text-gray_900 w-full font-normal text-base">
              Check profiles of verified Carpenters, Contractors, Interior
              Designers & many more service providers
            </h6>
            <div className="flex flex-row gap-4 items-start justify-start mt-[15px] w-[59%] md:w-full">
              <h4 className="text-orange_A700 font-normal text-xl">
                Search Now
              </h4>
              <img
                src="images/img_arrowright.svg"
                className="h-4 mt-0.5 w-4 mt-[7px]"
                alt="arrowright"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search