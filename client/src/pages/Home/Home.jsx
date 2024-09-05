import React, { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import artistic from '../../assets/images/artistic.png'
import dream from '../../assets/images/dream.png'
import fantasy from '../../assets/images/fantasy.png'
import late_night from '../../assets/images/late_night.png'
import missing_someone from '../../assets/images/missing_someone.png'
import nostolgia from '../../assets/images/nostolgia.png'
import out_of_the_world from '../../assets/images/out_of_the_world.png'
import romantic from '../../assets/images/romantic.png'
import sun_rise from '../../assets/images/sun_rise.png'

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

const Home = () => {
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
    { image: artistic, text: 'Artistic' },
    { image: dream, text: 'Dream' },
    { image: fantasy, text: 'Fantasy' },
    { image: late_night, text: 'Late Night' },
    { image: missing_someone, text: 'Missing Someone' },
    { image: nostolgia, text: 'Nostolgia' },
    { image: out_of_the_world, text: 'Out Of The World' },
    { image: romantic, text: 'Romantic' },
    { image: sun_rise, text: 'Sun Rise' }
  ];

  const [showInput, setShowInput] = useState(false);

  const handleAddClick = () => {
    setShowInput(!showInput);
  };

  return (
    <div className='home'>
      <div className='homeContent'>
        <div className='addMembers'>
          Add Members 
          <div className='addIconContainer' onClick={handleAddClick}>
            {showInput ? 
              <FontAwesomeIcon className='addIcon' icon={faMinus} /> 
              : 
              <FontAwesomeIcon className='addIcon' icon={faAdd} />
            }
          </div>
        </div>

        {showInput && (
          <div className='inputContainer'>
            <input type='text' placeholder='Enter member name' className='inputField' />
            <button className='addButton'>Add</button>
          </div>
        )}

        <div className='textHead'>Choose Card Color</div>
        <div className="color-carousel-container">
          <Slider {...settings2}>
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

        <div className='textHead'>Choose Theme</div>
        <div className="carousel-container">
          <Slider {...settings}>
            {slidesData.map((slide, index) => (
                <div key={index}>
                    <div style={{padding:'5px'}}>
              <div className="carousel-slide">
                <img src={slide.image} alt={`Slide ${index + 1}`} className="carousel-image" />
                <div className="carousel-text">{slide.text}</div>
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

export default Home;
