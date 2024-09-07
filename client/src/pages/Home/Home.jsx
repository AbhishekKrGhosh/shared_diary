import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
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

const colorOptions = [
  { color: "#191970", name: "Blue", colorCode: "rgba(25, 25, 112, 0.5)" },
  { color: "#8B008B", name: "Magenta", colorCode: "rgba(139, 0, 139, 0.5)" },
  { color: "#FF4500", name: "Orange", colorCode: "rgba(255, 69, 0, 0.5)" },
  { color: "#C71585", name: "Violet", colorCode: "rgba(199, 21, 133, 0.5)" },
  { color: "#DC143C", name: "Crimson", colorCode: "rgba(220, 20, 60, 0.5)" },
  { color: "#B22222", name: "Brick", colorCode: "rgba(178, 34, 34, 0.5)" },
  { color: "#008000", name: "Green", colorCode: "rgba(0, 128, 0, 0.5)" },
  { color: "#9ACD32", name: "Yellow Green", colorCode: "rgba(154, 205, 50, 0.5)" },
  { color: "#008B8B", name: "Dark Cyan", colorCode: "rgba(0, 139, 139, 0.5)" },
  { color: "#8B4513", name: "Brown", colorCode: "rgba(139, 69, 19, 0.5)" },
  { color: "#008080", name: "Teal", colorCode: "rgba(0, 128, 128, 0.5)" },
  { color: "#D4AF37", name: "Gold", colorCode: "rgba(212, 175, 55, 0.5)" }
];

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { accountName, currentUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("")
  const [color, setColor] = useState("")
  const [color2, setColor2] = useState('')

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

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
    { image: nostolgia, text: "Nostolgia" },
    { image: out_of_the_world, text: "Out Of The World" },
    { image: romantic, text: "Romantic" },
    { image: sun_rise, text: "Sun Rise" },
  ];

  const handleAddClick = async () => {
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.patch(
        "http://localhost:3001/api/account/add-email",
        {
          account_name: accountName,
          email,
        }
      );

      if (response.status === 200) {
        console.log("Email added successfully:", response.data);
        setEmail("");
        setShowInput(false);
      }
    } catch (error) {
      console.error("Error adding email:", error);
      setError("Failed to add email. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async ()=>{
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/account/${accountName}/update-theme-color`,
        {
          account_name:accountName,
          email: currentUser,
          theme,
          color,
        }
      );
    console.log(color, theme)
    dispatch(updateAccountDetails({color, theme}))
    navigate('/main')
    } catch (error) {
      console.error("Error updating theme and color:", error);
    }
    
  }

  return (
    <div className="home">
      <div className="homeContent">
        <div className="logoContainer">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <div className="addMembers">
          Add Members
          <div
            className="addIconContainer"
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? (
              <FontAwesomeIcon className="addIcon" icon={faMinus} />
            ) : (
              <FontAwesomeIcon className="addIcon" icon={faAdd} />
            )}
          </div>
        </div>

        {showInput && (
          <div className="inputContainer">
            <input
              type="email"
              placeholder="Enter email address"
              className="inputField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="addButton"
              onClick={handleAddClick}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <div className="textHead">Choose Card Color</div>
        <div className="color-carousel-container">
          <Slider {...settings2}>
            {colorOptions.map((color, index) => (
              <div key={index} >
                <div style={{ padding: "5px" }}>
                    <div onClick={()=>{setColor(color.colorCode)
                      setColor2(color.color)}
                  }
                    className="color-carousel-slide"
                    style={{ backgroundColor: color.color, border:`${color2==color.color?'5px,solid,white':'none'}` }}
                  >
                    <div className="color-text">{color.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="textHead">Choose Theme</div>
        <div className="carousel-container">
          <Slider {...settings}>
            {slidesData.map((slide, index) => (
              <div key={index}>
                <div style={{ padding: "5px" }}>
                  <div onClick={()=>setTheme(slide.image)} className="carousel-slide">
                    <img
                      src={slide.image}
                      style={{ backgroundColor: color.color, border:`${theme==slide.image?'5px,solid,white':'none'}` }}
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
          <button onClick={handleSave} className="saveButton">SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
