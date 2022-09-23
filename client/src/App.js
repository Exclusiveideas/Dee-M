import React from "react";
import Home from "./pages/home";
import Messenger from "./pages/messenger";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.currentUser);

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="messenger" element={<Messenger />} />
        <Route path="auth">
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
