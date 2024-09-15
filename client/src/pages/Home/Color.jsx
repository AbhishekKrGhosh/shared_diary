import React, { useState } from "react";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccountDetails } from "../../redux/user/userSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import SideMenu from "../../components/SideMenu/SideMenu";

const colorOptions = [
  { color: "#191970", name: "Blue", colorCode: "rgba(25, 25, 112, 0.5)" },
  { color: "#8B008B", name: "Magenta", colorCode: "rgba(139, 0, 139, 0.5)" },
  { color: "#FF4500", name: "Orange", colorCode: "rgba(255, 69, 0, 0.5)" },
  { color: "#C71585", name: "Violet", colorCode: "rgba(199, 21, 133, 0.5)" },
  { color: "#DC143C", name: "Crimson", colorCode: "rgba(220, 20, 60, 0.5)" },
  { color: "#B22222", name: "Brick", colorCode: "rgba(178, 34, 34, 0.5)" },
  { color: "#008000", name: "Green", colorCode: "rgba(0, 128, 0, 0.5)" },
  {
    color: "#9ACD32",
    name: "Yellow Green",
    colorCode: "rgba(154, 205, 50, 0.5)",
  },
  { color: "#008B8B", name: "Dark Cyan", colorCode: "rgba(0, 139, 139, 0.5)" },
  { color: "#8B4513", name: "Brown", colorCode: "rgba(139, 69, 19, 0.5)" },
  { color: "#008080", name: "Teal", colorCode: "rgba(0, 128, 128, 0.5)" },
  { color: "#D4AF37", name: "Gold", colorCode: "rgba(212, 175, 55, 0.5)" },
];

const Color = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountName, currentUser, theme } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("");
  const [color2, setColor2] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/api/account/${accountName}/update-theme-color`,
        {
          account_name: accountName,
          email: currentUser,
          color,
          theme
        },{
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          },
        }
      );
      console.log(color);
      dispatch(updateAccountDetails({ color }));
      navigate("/main");
    } catch (error) {
      console.error("Error updating theme and color:", error);
    }
  };
  return (
    <div className="home">
      <div
        style={{
          position: "absolute",
          display: "flex",
          width: "100vw",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50px",
            marginTop: "10px",
            marginLeft: "10px",
            padding: "2px",
            border: "2px solid white",
            display: "flex",
          }}
        >
          <img
            style={{ height: "50px", width: "50px", borderRadius: "50px" }}
            src={logo}
            alt="Logo"
          />
        </div>
        <h1
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "white",
            fontWeight: "900",
          }}
        >
          Shared Diary
        </h1>
        <div
          style={{
            height: "50px",
            width: "150px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onClick={handleMenuClick}
        >
          <FontAwesomeIcon
            style={{
              color: "white",
              marginRight: "30px",
              marginTop: "20px",
              height: "20px",
              width: "20px",
            }}
            icon={faEllipsisV}
          />
        </div>
      </div>
      <div className="homeContent2">
        <div className="textHead">Choose Card Color</div>
        <div className="color-carousel-container">
          <Slider {...settings}>
            {colorOptions.map((color, index) => (
              <div key={index}>
                <div style={{ padding: "5px" }}>
                  <div
                    onClick={() => {
                      setColor(color.colorCode);
                      setColor2(color.color);
                    }}
                    className="color-carousel-slide"
                    style={{
                      backgroundColor: color.color,
                      border: `${
                        color2 == color.color ? "5px,solid,white" : "none"
                      }`,
                    }}
                  >
                    <div className="color-text">{color.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="saveButtonContainer">
          <button onClick={handleSave} className="saveButton">
            SAVE
          </button>
        </div>
      </div>
      <SideMenu isVisible={menuVisible} onClose={handleCloseMenu} />
    </div>
  );
};

export default Color;
