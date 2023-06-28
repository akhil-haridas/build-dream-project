import React, { useState, useEffect } from "react";
import Navbar from "components/client/Navbar/Navbar";
import Profiles from "components/client/Profiles/Profiles";
import Breadcrumb from "components/client/Breadcrumb/Breadcrumb";
import Footer from "components/client/Footer/Footer";
import SelectInput from "components/client/SelectInput/SelectInput";
import { PROFESSIONALAPI, USERAPI } from "utils/api";
import Axios from "axios";
const Professionals = () => {
   const [locationFilter, setLocationFilter] = useState(null);
   const [categoryFilter, setCategoryFilter] = useState(null);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [filter, setFilter] = useState([]);
 const [searchQuery, setSearchQuery] = useState("");
  const handleLocationChange = (selectedOption) => {
    setLocationFilter(selectedOption);
  };

  const handleCategoryChange = (selectedOption) => {
    setCategoryFilter(selectedOption);
  };

  useEffect(() => {
    Axios.get(`${PROFESSIONALAPI}getcategories`, { withCredentials: true })
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const categoryOptions = category.map((item, index) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    Axios.get(`${USERAPI}professionals`, { withCredentials: true })
      .then((response) => {
        setData(response.data.DATA);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${USERAPI}getlocations`, { withCredentials: true })
      .then((response) => {
        setLocation(response.data.locationsAndDistricts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const locations = location.map((location) => ({
    value: `${location.location}, ${location.district}`,
    label: `${location.location}, ${location.district}`,
  }));

useEffect(() => {
  let filteredData = data;

  if (locationFilter) {
    filteredData = filteredData.filter(
      (professional) =>
        professional.location === locationFilter.value.split(", ")[0]
    );
  }

  if (categoryFilter) {
    filteredData = filteredData.filter(
      (professional) => professional.expertise === categoryFilter.value
    );
  }

  if (searchQuery) {
    filteredData = filteredData.filter((professional) =>
      professional.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  setFilter(filteredData);
}, [data, locationFilter, categoryFilter, searchQuery]);


  return (
    <>
      <Navbar active={"PROFESSIONALS"} />
      <Breadcrumb path={["Professionals"]} />
      <div className="bg-white_A700 flex flex-col font-rubik items-center justify-end mx-auto pt-[21px] sm:px-5 px-[21px] w-full">
        <div className="flex flex-col justify-end max-w-[1171px] mx-auto md:px-5 w-full">
          <div className="flex flex-col justify-start md:ml-[0] ml-[49px] mt-[38px] w-[96%] md:w-full">
            <input
              className="mb-[2rem] w-[50%]"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
            />
            <div className="flex flex-row items-center justify-start w-[18%] md:w-full mb-[4rem]">
              <SelectInput
                options={locations}
                onChange={handleLocationChange}
                placeholder={"Select Location"}
              />

              <SelectInput
                options={categoryOptions}
                onChange={handleCategoryChange}
                placeholder={"Select Profession"}
              />
            </div>

            <div className="flex-col gap-[26px] grid items-center w-full"></div>
          </div>
        </div>
      </div>
      <section
        className="site-section section-team"
        style={{ background: "white" }}
        id="team"
      >
        <div className="container">
          <h2>FIND BEST PROFESSIONALS</h2>
          <p className="section-subtitle">
            <span>This is the team ready to working with you</span>
          </p>
          <div className="team">
            <div className="row flex flex-wrap ml-[15px]">
              <Profiles data={filter} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Professionals;
