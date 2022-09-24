import React, { useEffect } from "react";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/userSlice";
import MessengerComponents from '../../components/messenger';

const Home = () => {
  const currentUser = useSelector(state => state.user?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!currentUser) navigate("/auth");
    // console.log(currentUser)
  }, [currentUser]);

  // const handleLogOut = () => {
  //   dispatch(logOut());
  // }
  
    return (
      <div className="home">
        <MessengerComponents />
      </div>
    );
};

export default Home;
