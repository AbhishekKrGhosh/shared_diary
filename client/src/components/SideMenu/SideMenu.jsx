import React from "react";
import axios from "axios";
import "./style.css";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/signout`,{
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY
        },
      });
      dispatch(signOut());
    } catch (error) {
      console.error("Signout failed", error);
    }
  };

  return (
    <div className={`side-menu ${isVisible ? "visible" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <div className="menu-items">
        <ul>
          <li onClick={() => navigate("/main")}>Home</li>
          <li onClick={() => navigate("/theme")}>Theme</li>
          <li onClick={() => navigate("/color")}>Card Color</li>
          <li onClick={() => navigate("/members")}>Add members</li>
        </ul>
      </div>
      <div className="signout-container">
        <div className="signoutbutton" onClick={handleSignout}>
          Signout
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
