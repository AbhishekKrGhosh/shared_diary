import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, updateAccountInfo } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import google from "../../assets/images/google.png";
import "./style.css";

const OAuth3 = () => {
  const dispatch = useDispatch();
  const { accountName } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },{
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          },
        }
      );

      const data = await res.data;
      console.log(data);
      try {
        let mail = data.email;

        console.log("accountName: ", accountName, "| mail: ", mail);
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/account/${accountName}/email/${mail}`,{
            headers: {
              'x-api-key': import.meta.env.VITE_API_KEY
            },
          }
        );
        dispatch(signInSuccess(data.email));
        dispatch(updateAccountInfo({ accountName, mail }));
        navigate("/main");
      } catch (error) {
        console.log("invalid access: ", error);
      }
    } catch (error) {
      console.log("could not login with google ", error);
    }
  };
  return (
    <button className="google" onClick={handleGoogleClick}>
      <img className="googleLogo" src={google} />
    </button>
  );
};

export default OAuth3;
