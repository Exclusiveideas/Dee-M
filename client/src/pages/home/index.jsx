import React, { useEffect } from "react";
import "./home.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/userSlice";

const Home = () => {
  const currentUser = useSelector(state => state.user?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!currentUser) navigate("/auth");
  }, [currentUser]);

  const handleLogOut = () => {
    dispatch(logOut());
  }
  
    return (
      <div className="home">
        <h1>Home</h1>
        <button>
          <Link to="/messenger">Go to Messenger</Link>
        </button>
        <button onClick={handleLogOut}>
          LOG OUT
        </button>
      </div>
    );
};

export default Home;
