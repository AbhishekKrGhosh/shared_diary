import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  updateAccountInfo,
} from "../../redux/user/userSlice";
import OAuth from "../../components/OAuth/OAuth";
import axios from "axios";

const SignIn2 = () => {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState("");
  const { error, loading, accountName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        formData,{
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          },
        }
      );
      const data = res.data;
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      try {
        let mail = data.email;
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/account/${accountName}/email/${mail}`,{
            headers: {
              'x-api-key': import.meta.env.VITE_API_KEY
            },
          }
        );
        dispatch(signInSuccess(data.email));
        console.log("accountName: ", accountName, "| mail: ", mail);
        dispatch(updateAccountInfo({ accountName, mail }));
        navigate("/main");
      } catch (error) {
        console.log("invalid access: ", error);
        setErr("invalid access");
        dispatch(signInFailure(data));
      }
    } catch (error) {
      setErr("invalid access");
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="signin_background">
      <div className="box">
        <div className="login">LOGIN</div>
        <div className="checkAccountContainer">
          <form onSubmit={handleSubmit} className="checkAccount">
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
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          or
          <OAuth />
        </div>
        <div className="routeToOther">
          <div>
            <Link className="routeToOtherLink" to="/create-by-others">
              <span className="linkText">Account created by others, </span>
              <span className="link">click here</span>
            </Link>
          </div>
          <div>
            <Link className="routeToOtherLink" to="/sign-up">
              <span className="linkText">Don't have an account, </span>
              <span className="link">SignUp</span>
            </Link>
          </div>
        </div>
        <p style={{ color: "red" }}>{error ? err : ""}</p>
      </div>
    </div>
  );
};

export default SignIn2;
