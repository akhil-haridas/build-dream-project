import React, { useState } from "react";
import Axios from "axios";
import { SHOPAPI } from "utils/api";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/jpg") {
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
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    const token = localStorage.getItem("token");
    Axios.post(`${SHOPAPI}addProduct`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.added) {
          alert("Product added Successfully");
          navigate("/shop/products");
        }
      })
      .catch((error) => {
        // Handle error
         navigate("/server-error");
        console.log(error);
      });
  };

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Products</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/admin/products">Product</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className href="/admin/products">
                Product management
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="/admin/overview">
                Overview Product
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
                      Product Name
                    </label>
                  </div>
                </div>
                <div className="formbold-input-flex">
                  <div>
                    <input
                      type="number"
                      name="grossprice"
                      id="email"
                      defaultValue=""
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="formbold-form-input"
                    />
                    <label htmlFor="email" className="formbold-form-label">
                      Gross Price
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            {fileError && (
              <p className="file-error" style={{ color: "red" }}>
                {fileError}
              </p>
            )}
            <label htmlFor="phone" className="formbold-form-label">
              <i className="bx bx-image-add" /> Attach Files
            </label>
            <input
              type="file"
              name="image"
              id="file-input"
              accept="image/jpeg, image/jpg"
              onChange={handleImageChange}
              className="formbold-form-input"
            />
          </div>
          <button
            className="btn formbold-btn"
            type="button"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </div>
      </div>
    </main>
  );
};

export default Addproduct;
