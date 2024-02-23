import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SignUpForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
    city: "",
    dob: "",
    longitude: "",
    latitude: "",
    modeOfDelivery: "",
  });

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the input is for email and validate
    if (name === 'email') {
      const isValidEmail = emailPattern.test(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        isValidEmail,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  
  

  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        formData
      );
      console.log("User created:", response.data);
      toast.success("User created successfully!");
  
      // Clear the form inputs after successful submission
      setFormData({
        name: "",
        mobileNumber: "",
        email: "",
        password: "",
        address: "",
        pincode: "",
        city: "",
        dob: "",
        longitude: "",
        latitude: "",
        modeOfDelivery: "",
      });
  
    } catch (error) {
      console.error("Error creating user:", error.response.data.message);
      toast.error("Error creating user. Please try again.");
    }
  };
  
  
  return (
    <div>
      <ToastContainer />
      <section className="container">
        <header>Sign-up Form</header>
        <form onSubmit={handleSubmit} className="form">
          <div className="column">
            <div className="input-box">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <label>Phone Number</label>
              <input
                type="number"
                name="mobileNumber"
                placeholder="Enter phone number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="input-box">
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
              className={formData.isValidEmail ? '' : 'invalid'} 
              required
            />
            {!formData.isValidEmail && (
              <p className="error-message">Invalid email address</p>
            )}
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="column"></div>
          <div className="input-box">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter street address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="column">
            <div className="input-box">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter Pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Birth Date</label>
              <input
                type="date"
                name="dob"
                placeholder="Enter birth date"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-box">
              <label>Longitude</label>
              <input
                type="text"
                name="longitude"
                placeholder="Enter Longitude"
                value={formData.longitude}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Latitude</label>
              <input
                type="text"
                name="latitude"
                placeholder="Enter Latitude"
                value={formData.latitude}
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleLocationFetch}>
                Get Current Location
              </button>
            </div>
            <div className="input-box">
              <label>Mode of Delivery</label>
              <div className="delivery-input">
                <div className="combined-input">
                  <select
                    name="modeOfDelivery"
                    value={formData.modeOfDelivery}
                    onChange={handleInputChange}
                    className="select"
                  >
                    <option value="">Select Mode of Delivery</option>
                    <option value="Home Delivery">Home Delivery</option>
                    <option value="Pickup">Pickup</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default SignUpForm;
