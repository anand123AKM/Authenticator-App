"use client";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    age: "",
    email: "",
  });
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      setToken(response.data.token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleProfileAccess = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile data:", response.data);
    } catch (error) {
      console.error("Error accessing profile:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {token && (
        <div>
          <p>Token: {token}</p>
          <button onClick={handleProfileAccess}>Access Profile</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
