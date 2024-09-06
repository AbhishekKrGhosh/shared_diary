import React from 'react';
import './style.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import logo from '../../assets/images/logo.png'

const colorOptions = [
  {color:'#191970',
    name:'Blue'
  },{color:'#8B008B',
    name:'Magenta'
  },{color:'#FF4500',
    name:'Orange'
  },{color:'#C71585',
    name:'Violet'
  },{color:'#DC143C',
    name:'Crimson'
  },{color:'#B22222',
    name:'Brick'
  },{color:'#008000',
    name:'Green'
  },{color:'#9ACD32',
    name:'Yellow Green'
  },{color:'#008B8B',
    name:'Dark Cyan'
  },{color:'#8B4513',
    name:'Brown'
  },{color:'#008080',
    name:'Teal'
  },{color:'#D4AF37',
    name:'Gold'
  }
];

const Home2 = () => {
  
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

  return (
    <div className='home'>
      <div className='homeContent2'>
      <div className='logoContainer'>
        <img className='logo' src={logo}/>
        </div>
        <div className='textHead'>Choose Card Color</div>
        <div className="color-carousel-container">
          <Slider {...settings}>
            {colorOptions.map((color, index) => (
              <div key={index}>
                <div style={{padding:'5px'}}>
                <div className="color-carousel-slide" style={{ backgroundColor: color.color }}>
                <div className="color-text">{color.name}</div>
                </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className='saveButtonContainer'>
    <button className='saveButton'>SAVE</button>
  </div>
      </div>
    </div>
  );
}

export default Home2;
