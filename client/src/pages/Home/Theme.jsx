import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEllipsisV, faMinus } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import artistic from "../../assets/images/artistic.png";
import dream from "../../assets/images/dream.png";
import fantasy from "../../assets/images/fantasy.png";
import late_night from "../../assets/images/late_night.png";
import missing_someone from "../../assets/images/missing_someone.png";
import nostolgia from "../../assets/images/nostolgia.png";
import out_of_the_world from "../../assets/images/out_of_the_world.png";
import romantic from "../../assets/images/romantic.png";
import sun_rise from "../../assets/images/sun_rise.png";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateAccountDetails } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";

const Theme = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountName, currentUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("");
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slidesData = [
    { image: artistic, text: "Artistic" },
    { image: dream, text: "Dream" },
    { image: fantasy, text: "Fantasy" },
    { image: late_night, text: "Late Night" },
    { image: missing_someone, text: "Missing Someone" },
    { image: nostolgia, text: "Nostalgia" },
    { image: out_of_the_world, text: "Out Of The World" },
    { image: romantic, text: "Romantic" },
    { image: sun_rise, text: "Sun Rise" },
  ];

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/api/account/${accountName}/update-theme-color`,
        {
          account_name: accountName,
          email: currentUser,
          theme,
        },{
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          },
        }
      );
      console.log(theme);
      dispatch(updateAccountDetails({ theme }));
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
      <div className="homeContent" style={{ height: "100%" }}>
        <div className="textHead">Choose Theme</div>
        <div className="carousel-container">
          <Slider {...settings}>
            {slidesData.map((slide, index) => (
              <div key={index}>
                <div style={{ padding: "5px" }}>
                  <div
                    onClick={() => setTheme(slide.image)}
                    className="carousel-slide"
                  >
                    <img
                      src={slide.image}
                      style={{
                        border: `${
                          theme == slide.image ? "5px,solid,white" : "none"
                        }`,
                      }}
                      alt={`Slide ${index + 1}`}
                      className="carousel-image"
                    />
                    <div className="carousel-text">{slide.text}</div>
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

export default Theme;
