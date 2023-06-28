import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SHOPAPI } from "utils/api";
import Axios from "axios";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editName, setEditName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    Axios.get(`${SHOPAPI}getproduct?id=${id}`, { withCredentials: true })
      .then((response) => {
        const product = response.data.product;
        setData(product);
        setEditPrice(product.price);
        setEditName(product.name);
        setImagePreview(`http://localhost:4000/uploads/${product.image}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (editName.trim() !== "") {
      formData.append("name", editName);
    }
    if (editPrice.trim() !== "") {
      formData.append("price", editPrice);
    }
    if (editImage !== null) {
      formData.append("image", editImage);
    }

    Axios.post(`${SHOPAPI}editproduct?id=${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
      .then((response) => {
        const result = response.data;
        if (result.status) {
          alert("Updated successfully");
          navigate("/shop/products");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this work?")) {
      Axios.delete(`${SHOPAPI}deleteproduct?id=${id}`, {
        withCredentials: true,
      })
        .then((response) => {
          const result = response.data;
          console.log(result);
          if (result.status) {
            alert("Deleted successfully");
            navigate("/shop/products");
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
    <>
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
          <a
            className="btn-download"
            style={{ background: "red" }}
          >
            <i className="bx bx-x-circle" />
            <span className="text" onClick={handleDelete}>
              Remove
            </span>
          </a>
        </div>
        <div className="table-data" style={{ padding: "10px" }}>
          <div className="order">
            <div className="head">
              <p style={{ fontSize: "20px" }}>
                about 
                <span
                  style={{
                    fontSize: "30px",
                    color: "#3C91E6",
                    textTransform: "uppercase",
                    fontWeight: "bolder",
                  }}
                >
                  {data.name}
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
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="formbold-form-input"
                      />
                      <label
                        htmlFor="firstname"
                        className="formbold-form-label"
                      >
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
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
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
              {fileError && <p className="file-error">{fileError}</p>}
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
              onClick={handleFormSubmit}
            >
              Update changes
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
