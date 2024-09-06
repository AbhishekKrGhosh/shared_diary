import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import google from "../../assets/images/google.png";
import { Link, useNavigate } from "react-router-dom";
import OAuth2 from "../../components/OAuth/OAuth2";
import { signInSuccess, updateAccountInfo } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SignUp2 = () => {
  const { accountName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      console.log(formData);
      const res = await axios.post(
        "http://localhost:3001/api/auth/signup",
        formData
      );
      const data = res;
      setLoading(false);
      console.log(data);
      if (data.success === false) {
        setError(true);
        return;
      }
      try {
        console.log("data:", data);
        let mail = formData.email;
        console.log("email:", mail, "| accout name: ", accountName);
        const res2 = await axios.post(
          "http://localhost:3001/api/account/create",
          {
            account_name: accountName,
            email: mail,
          }
        );
        dispatch(signInSuccess(data.email));
        console.log("accountName: ", accountName, "| mail: ", mail);
        dispatch(updateAccountInfo({ accountName, mail }));
        navigate("/home");
      } catch (error) {
        console.log("invalid access: ", error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="signin_background">
      <div className="box">
        <div className="login">SIGNUP</div>
        <div style={{ textAlign: "center" }}>
          (if you already have another account on SharedDiary, kindly use your
          old password)
        </div>
        <div className="checkAccountContainer">
          <form onSubmit={handleSubmit} className="checkAccount">
            <input
              type="text"
              placeholder="name"
              id="name"
              onChange={handleChange}
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="input"
            />
            <button disabled={loading} className="checkAccountButton">
              {loading ? "Loading..." : "SignUp"}
            </button>
          </form>
          or
          <OAuth2 />
        </div>
        <div className="routeToOther">
          <div>
            <Link className="routeToOtherLink" to="/create-by-others">
              <span className="linkText">Account created by others, </span>
              <span className="link">click here</span>
            </Link>
          </div>
          <div>
            <Link className="routeToOtherLink" to="/sign-in">
              <span className="linkText">Already have an account, </span>
              <span className="link">SignIn</span>
            </Link>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "red" }}>
          {error && "Something went wrong!"}
        </p>
      </div>
    </div>
  );
};

export default SignUp2;
