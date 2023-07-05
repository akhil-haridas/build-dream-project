import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { PROFESSIONALAPI } from "utils/api";
import { useNavigate } from "react-router-dom";
const Addwork = () => {
  const user = useSelector((state) => state.professional.professionalName);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/webp"
      ) {
        reader.onloadend = () => {
          setImage(file);
          setFileError("");
        };
        reader.readAsDataURL(file);
      } else {
        setImage(null);
        setFileError("Please select a JPEG or JPG file.");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    formData.append("image", image);
    const token = localStorage.getItem("token");
    Axios.post(`${PROFESSIONALAPI}addWork`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.added) {
          alert("Work Added SuccessFully");
          navigate("/professional/works");
        }

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Works</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/admin/customers">Works</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a href="/admin/customers">Work Management</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="/admin/customers">
                Add Work
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="table-data" style={{ padding: "10px" }}>
        <div className="order">
          <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
              <form
                style={{
                  marginLeft: "-130px",
                  marginRight: "-130px",
                  marginTop: "-30px",
                }}
              >
                <div className="formbold-input-flex">
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="firstname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="formbold-form-input"
                    />
                    <label htmlFor="firstname" className="formbold-form-label">
                      Work Title
                    </label>
                  </div>
                </div>
                <div className="formbold-textarea">
                  <textarea
                    rows={6}
                    maxLength
                    name="description"
                    id="message"
                    placeholder="Write about the category...."
                    className="formbold-form-input"
                    defaultValue={""}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label htmlFor="message" className="formbold-form-label">
                    Description
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="formbold-form-label">
              {fileError && (
                <p className="file-error" style={{ color: "red" }}>
                  {fileError}
                </p>
              )}
              <i className="bx bx-image-add" /> Attach Image
            </label>
            <input
              type="file"
              name="image"
              id="phone"
              accept="image/jpeg, image/jpg"
              onChange={handleImageChange}
              className="formbold-form-input"
            />
          </div>
          <button className="formbold-btn" onClick={handleSubmit}>
            Add Magazine
          </button>
        </div>
      </div>
    </main>
  );
};

export default Addwork;
