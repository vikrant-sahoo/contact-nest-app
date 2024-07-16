import React, { useState } from "react";
import "../assets/css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserPlus, FaEnvelope, FaMobileAlt, FaHome } from "react-icons/fa";

const AddContact = () => {
      const [values, setValues] = useState({
            name: "",
            email: "",
            phone: "",
            address: ""
      });

      const navigate = useNavigate();

      const handleInput = (event) => {
            setValues({...values, [event.target.name]: event.target.value});
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            axios.post("http://localhost:4000/contact-nest/add-contact", values, {
                  headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
            }).then((res) => {
                        if (res.data.success) {
                              toast.success("Contact added successfully...", {
                                    position: "top-right",
                                    autoClose: 5000
                              });
                              navigate("/dashboard");
                        }
                  }).catch(err => {
                        console.log(err);
                  });
      };

      return (
            <div className="form-container add-form">
                  <form className="form" id="myForm" onSubmit={handleSubmit}>
                        <h2>Create Your Contact</h2>
                        
                        <div className="form-group">
                              <div className="form-icon"> <FaUserPlus></FaUserPlus> </div>
                              <input type="text" name="name" id="name" className="form-control" placeholder="Enter Name" onChange={handleInput} />
                        </div>

                        <div className="form-group">
                              <div className="form-icon"> <FaEnvelope></FaEnvelope> </div>
                              <input type="email" name="email" id="email" className="form-control" placeholder="Enter E-mail ID" autoComplete="off" onChange={handleInput} />
                        </div>

                        <div className="form-group">
                              <div className="form-icon"> <FaMobileAlt></FaMobileAlt> </div>
                              <input type="tel" name="phone" id="phone" className="form-control" placeholder="Enter Phone Number" onChange={handleInput} />
                        </div>

                        <div className="form-group">
                              <div className="form-icon"> <FaHome></FaHome> </div>
                              <input name="address" id="address" className="form-control" placeholder="Enter Contact's City Name" onChange={handleInput} />
                        </div>

                        <button className="form-btn">Create and Save</button>
                  </form>
            </div>
      );
};

export default AddContact;