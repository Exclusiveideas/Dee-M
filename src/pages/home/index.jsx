import React, { useEffect } from "react";
import "./home.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector(state => state.user?.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    // if(!user) 
    navigate("/auth")
  }, []);
  
    return (
      <div className="home">
        <h1>Home</h1>
        <button>
          <Link to="/messenger">Go to Messenger</Link>
        </button>
      </div>
    );
};

export default Home;
