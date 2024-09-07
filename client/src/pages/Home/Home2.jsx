import React, { useState } from 'react';
import './style.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import logo from '../../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateAccountDetails } from '../../redux/user/userSlice';
import axios from 'axios';

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

const Home2 = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { accountName, currentUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("")
  const [color2, setColor2] = useState('')

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

  const handleSave = async ()=>{
    try {
      const response = await axios.patch(
        `https://shared-diary-1.onrender.com/api/account/${accountName}/update-theme-color`,
        {
          account_name:accountName,
          email: currentUser,
          color,
        }
      );
    console.log(color)
    dispatch(updateAccountDetails({color}))
    navigate('/main')
    } catch (error) {
      console.error("Error updating theme and color:", error);
    }
    
  }
  return (
    <div className='home'>
      <div className='homeContent2'>
      <div className='logoContainer'>
        <img className='logo' src={logo}/>
        </div>

        <div className="textHead">Choose Card Color</div>
        <div className="color-carousel-container">
          <Slider {...settings}>
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

        <div className='saveButtonContainer'>
    <button onClick={handleSave} className='saveButton'>SAVE</button>
  </div>
      </div>
    </div>
  );
}

export default Home2;
