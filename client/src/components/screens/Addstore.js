import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddStoreForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const storeHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      console.log({name,email,password,location,phoneNumber})
      const data = await axios.post(
        "/api/auth/store/register",
        {
          name,
          email,
          password,
          location,
          phoneNumber,
        },
      );

      localStorage.setItem("authToken", data.token);

      history.push("/store");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="card card-default">
          <div className="card-header">
            <h3 className="card-title">Add Store</h3>
          </div>
          <div className="card-body">
            <form onSubmit={storeHandler}  className='thead'>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="name"
                      placeholder="Enter store name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      id="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="location"
                      placeholder="Enter store location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="phoneNumber"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      id="password"
                      autoComplete="true"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      id="confirmPassword"
                      autoComplete="true"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group text-right">
                    <button type="submit" className="btn btn-primary">
                      Add Store
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStoreForm;