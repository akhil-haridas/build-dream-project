import React, { useState, useEffect } from "react";
import "./Myaccount.css";
import { Helmet } from "react-helmet";
import { SHOPAPI, imageAPI } from "utils/api";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
const Myaccount = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [expertType, setExpertType] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [show, setShow] = useState(false);
  const [bio, setBio] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fb, setFb] = useState("");
  const [twitter, setTwitter] = useState("");
  const [link, setLink] = useState("");
  const [insta, setInsta] = useState("");

  const handleImageSelect = (event) => {
    setShow(false);
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${SHOPAPI}getdetailss`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.data);
        setExpertType(response.data.data.businessType);
        setName(response.data.data.name)
        if (response.data.data.image) setShow(true);
      })
      .catch((error) => {
         navigate("/server-error");
        console.log(error);
      });
  }, []);

  const generalHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", file);
    formData.append("businessType", expertType);

    const token = localStorage.getItem("token");

    Axios.post(`${SHOPAPI}generaledit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        const result = response.data.user;
        setData(result);
        alert("Updated Successfully");
        navigate("/shop/myaccount");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePasswordMatch = () => {
    if (confirmPassword !== "" && password !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError("");
    }
  };
  const socialHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("fb", fb);
    formData.append("twitter", twitter);
    formData.append("link", link);
    formData.append("insta", insta);
    const token = localStorage.getItem("token");
    Axios.post(`${SHOPAPI}socialedit`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        const result = response.data.user;
        setData(result);
        alert("Updated Successfully");
        navigate("/shop/myaccount");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const infoHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("district", district);
    formData.append("mobile", mobile);
    const token = localStorage.getItem("token");
    Axios.post(`${SHOPAPI}infoedit`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        const result = response.data.user;
        setData(result);
        alert("Updated Successfully");
        navigate("/shop/myaccount");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const passwordHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("current", current);
    formData.append("password", password);
    const token = localStorage.getItem("token");
    Axios.post(`${SHOPAPI}changepass`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.status) {
          window.location.reload();
          alert("password changed");
        } else {
          alert("wrong old password ");
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
          <h1>My Account</h1>
          <ul className="breadcrumb bg-transparent">
            <li>
              <a href="/admin/home">Home</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="/admin/overview">
                My Account
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Helmet>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a
                  className="list-group-item list-group-item-action active"
                  data-toggle="list"
                  href="#account-general"
                >
                  General
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-change-password"
                >
                  Change password
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-info"
                >
                  Info
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-social-links"
                >
                  Social links
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div className="tab-pane fade active show" id="account-general">
                  <div className="card-body media align-items-center">
                    {show ? (
                      <img
                        src={
                          data.image
                            ? `${imageAPI}${data.image}`
                            : "/images/ImageUpload.png"
                        }
                        alt=""
                        className="d-block ui-w-80"
                      />
                    ) : (
                      <img
                        src={
                          previewImage
                            ? previewImage
                            : "/images/ImageUpload.png"
                        }
                        alt=""
                        className="d-block ui-w-80"
                      />
                    )}

                    <div className="media-body ml-4">
                      <label className="btn btn-primary">
                        Upload new photo
                        <input
                          type="file"
                          onChange={handleImageSelect}
                          className="account-settings-fileinput"
                        />
                      </label>

                      <div className="text-light small mt-1">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </div>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        defaultValue={data.email}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={data.category}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Business Type</label>

                      <select
                        className="custom-select"
                        onChange={(e) => setExpertType(e.target.value)}
                        placeholder={data.businessType}
                        value={expertType}
                      >
                        <option>Online/Offline</option>
                        <option>Online</option>
                        <option>Offline</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-right mt-3 pr-[3rem] pb-[2rem]">
                    <button
                      onClick={generalHandler}
                      type="button"
                      className="btn btn-primary"
                    >
                      Save changes
                    </button>
                  </div>
                </div>

                <div className="tab-pane fade" id="account-change-password">
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Current password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Repeat new password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyUp={handlePasswordMatch}
                      />
                      {passwordError && (
                        <p className="text-danger">{passwordError}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right mt-3 pr-[3rem] pb-[2rem]">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={passwordHandler}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-info">
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Bio</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        placeholder={data.bio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={data.location}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country</label>
                      <select
                        className="custom-select"
                        value={data.district}
                        onChange={(e) => setDistrict(e.target.value)}
                      >
                        <option>THIRUVANATHAPURAM</option>
                        <option>KOLLAM</option>
                        <option>PATHANAMTHITTA</option>
                        <option>ALAPPUAHA</option>
                        <option>KOTTAYAM</option>
                        <option>IDUKKI</option>
                        <option>ERANAKULAM</option>
                        <option>THRISSUR</option>
                        <option>PALAKKAD</option>
                        <option>MALAPPURAM</option>
                        <option>KOZHIKODE</option>
                        <option>WAYANAD</option>
                        <option>KANNUR</option>
                        <option>KASARGODE</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={data.mobile}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="text-right mt-3 pr-[3rem] pb-[2rem]">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={infoHandler}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-social-links">
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Twitter</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={data.twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Facebook</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={data.facebook}
                        onChange={(e) => setFb(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">LinkedIn</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={data.linkedin}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Instagram</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={data.insta}
                        onChange={(e) => setInsta(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-right mt-3 pr-[3rem] pb-[2rem]">
                    <button
                      type="button"
                      className="btn"
                      onClick={socialHandler}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Myaccount;
