import React,{useState} from 'react'
import './AddCategory.css'
import Axios from 'axios';
import { AdminAPI } from 'utils/api';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

const navigate = useNavigate()
    const [name, setName] = useState('')
    const [role, setRole] = useState('PROFESSIONAL')
    const [file, setFile] = useState(null)
      const [fileError, setFileError] = useState("");
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      if (file) {
        if (file.type === "image/jpeg" || file.type === "image/jpg") {
          reader.onloadend = () => {
            setFile(file);
            setFileError("");
          };
          reader.readAsDataURL(file);
        } else {
          setFile(null);
          setFileError("Please select a JPEG or JPG file.");
        }
      }
    };
    
    const submitHandler = (event) => {
        event.preventDefault();


      const formData = new FormData();

      formData.append("category", name);
      formData.append("role",role);
      formData.append("image", file);

      Axios.post(`${AdminAPI}addcategory`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
        .then((response) => {
          const result = response.data;
          console.log(result);
          if (result.status) {
            navigate("/admin/categories");
          } else {
            alert(result.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Categories</h1>
          <ul className="breadcrumb">
            <li>
              <a>Categories</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a>Category Management</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active">Add Category</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="table-data" style={{ padding: "10px" }}>
        <div className="order">
          <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
              <form
                action
                method="post"
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
                      placeholder
                      className="formbold-form-input bg-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="firstname" className="formbold-form-label">
                      Category Name
                    </label>
                  </div>
                </div>
                <div className="formbold-textarea ">
                  <select
                    className="border-transparent bg-transparent"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>PROFESSIONAL</option>
                    <option>SHOP</option>
                  </select>
                  <label htmlFor="message" className="formbold-form-label">
                    Category for
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="pl-[2.25rem]">
            <label htmlFor="phone" className="formbold-form-label">
                {fileError && <p className="file-error" style={{color:"red"}}>{fileError}</p>}
              <i className="bx bx-image-add" /> Attach Image
            </label>
            <input
              type="file"
              name="image"
              id="phone"
              accept="image/*"
              placeholder
              className="formbold-form-input"
              onChange={handleImageUpload}
            />
          </div>
          <button className="formbold-btn" onClick={submitHandler}>
            Add Category
          </button>
        </div>
      </div>
    </main>
  );
}

export default AddCategory