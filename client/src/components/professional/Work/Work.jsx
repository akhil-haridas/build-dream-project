import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PROFESSIONALAPI, imageAPI } from "utils/api";
import Axios from "axios";

const Work = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [editImage, setEditImage] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${PROFESSIONALAPI}getwork?id=${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const work = response.data.work;
        setData(work);
        setEditTitle(work.title);
        setEditDescription(work.description);
        setImagePreview(`${imageAPI}${work.image}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (editTitle.trim() !== "") {
      formData.append("title", editTitle);
    }
    if (editDescription.trim() !== "") {
      formData.append("description", editDescription);
    }
    if (editImage !== null) {
      formData.append("image", editImage);
    }

    const token = localStorage.getItem("token");
    Axios.post(`${PROFESSIONALAPI}editwork?id=${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        const result = response.data;
        console.log(result);
        if (result.status) {
          alert("Updated successfully");
          navigate("/professional/works");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this work?")) {
      Axios.delete(`${PROFESSIONALAPI}deletework?id=${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const result = response.data;
          console.log(result);
          if (result.status) {
            alert("Deleted successfully");
            navigate("/professional/works");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/jpg") {
        reader.onloadend = () => {
          setEditImage(file);
          setImagePreview(reader.result);
          setFileError("");
        };
        reader.readAsDataURL(file);
      } else {
        setEditImage(null);
        setImagePreview(null);
        setFileError("Please select a JPEG or JPG file.");
      }
    }
  };

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Works</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/admin/category">Works</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a href="/admin/category">Work Management</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="/admin/add_product">
                Overview Work
              </a>
            </li>
          </ul>
        </div>
        <a
          onClick={handleDelete}
          className="btn-download"
          style={{ background: "red" }}
        >
          <i className="bx bx-x-circle" />
          <span className="text">Remove</span>
        </a>
      </div>
      <div className="table-data" style={{ padding: "10px" }}>
        <div className="order">
          <div className="head">
            <p style={{ fontSize: "20px" }}>
              about {" "}
              <span
                style={{
                  fontSize: "30px",
                  color: "#3C91E6",
                  textTransform: "uppercase",
                  fontWeight: "bolder",
                }}
              >
                {data.title}
              </span>
            </p>
          </div>
          <div className="card mb-4" style={{ background: "transparent" }}>
            <div
              className="slideshow-container"
              style={{ width: "250px", paddingLeft: "38px" }}
            >
              <div className="mySlides fade" style={{ width: "250px" }}>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    style={{ width: "100%" }}
                    alt="Product"
                  />
                )}
              </div>
            </div>

            <br />
          </div>
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
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="formbold-form-input"
                    />
                    <label htmlFor="firstname" className="formbold-form-label">
                      Category Name
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
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
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
              {fileError && <p className="file-error">{fileError}</p>}
              <i className="bx bx-image-add" /> Attach Files
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
          <button className="formbold-btn" onClick={handleFormSubmit}>
            Update Changes
          </button>
        </div>
      </div>
    </main>
  );
};

export default Work;
