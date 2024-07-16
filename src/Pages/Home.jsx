import React from "react";
import Navbar from "../Components/Navbar";
import "../assets/css/home.css";

const Home = () => {
      return (
            <>
                  <Navbar></Navbar>
                  <div className="home">
                        <h1 className="home-title">Your Ultimate Contact Management Solution</h1>
                        <p className="home-details"><span>Contact-Nest</span> offers a secure and efficient solution for managing your contacts. With an user-friendly interface, it helps you keep your connections organized and accessible, making it easier than ever to stay in touch.</p>
                  </div>
            </>
            
      );
}

export default Home;