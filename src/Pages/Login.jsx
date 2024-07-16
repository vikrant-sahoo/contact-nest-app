import React, { useState } from "react";
import "../assets/css/form.css";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Components/Validation";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../App";

const Login = () => {
      const [values, setValues] = useState({
            email: "",
            password: ""
      });

      const {user, setUser} = useContext(UserContext);
      const [errors, setErrors] = useState({});
      const [serverErrors, setServerErrors] = useState([]);
      const navigate = useNavigate();

      const handleInput = (event) => {
            setValues({...values, [event.target.name]: event.target.value});
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            const errs = Validation(values);
            setErrors(errs);
            if (errs.email === "" && errs.password === "") {
                  axios.post("https://contact-nest-app.vercel.app/contact-nest/login", values).then(res => {
                        if (res.data.success) {
                              toast.success("Login is Successful", {
                                    position: "top-right",
                                    autoClose: 5000
                              });
                              localStorage.setItem("token", res.data.token);
                              setUser(res.data.user);
                              navigate("/dashboard");
                        }
                  }).catch(err => {
                        if (err.response.data.errors) {
                              setServerErrors(err.response.data.errors);
                        } else {
                              console.log(err);
                        };
                  })
            }
      };

      return (
            <div className="form-container">
                  <form className="form" onSubmit={handleSubmit}>
                        <h2>Login with your <span>Contact-Nest</span> Account</h2>
                        <div className="form-group">
                              <label htmlFor="email" className="form-label">Email ID: </label>
                              <input type="email" name="email" id="email" className="form-control" placeholder="Enter Your E-mail ID" autoComplete="off" onChange={handleInput} />
                              {
                                    errors.email && <em className="error">{errors.email}</em>
                              }
                        </div>

                        <div className="form-group">
                              <label htmlFor="password" className="form-label">Password: </label>
                              <input type="password" name="password" id="password" className="form-control" placeholder="Enter Your Password" onChange={handleInput} />
                              {
                                    errors.password && <em className="error">{errors.password}</em>
                              }
                        </div>

                        {
                              serverErrors.length > 0 && (
                                    serverErrors.map((error, index) => (
                                          <p className="error" key={index}>{error.msg}</p>
                                    ))
                              )
                        }

                        <button className="form-btn">Login</button>

                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                  </form>
            </div>
      );
};

export default Login;