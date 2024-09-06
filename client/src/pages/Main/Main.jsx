import React, { useState } from 'react'
import './style.css'
import logo from '../../assets/images/logo.png'
import artistic from '../../assets/images/artistic.png'
import dream from '../../assets/images/dream.png'
import fantasy from '../../assets/images/fantasy.png'
import late_night from '../../assets/images/late_night.png'
import missing_someone from '../../assets/images/missing_someone.png'
import nostolgia from '../../assets/images/nostolgia.png'
import out_of_the_world from '../../assets/images/out_of_the_world.png'
import romantic from '../../assets/images/romantic.png'
import sun_rise from '../../assets/images/sun_rise.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Diary from '../../components/Diary/Diary'
import ToDo from '../../components/ToDo/ToDo'


const Main = () => {
    const dynamicImageUrl = dream;
    const [isShared, setIsShared] = useState(true); // Toggle between shared and personal
  
    const handleToggle = () => {
      setIsShared(!isShared); // Toggle the state
    };
  
    return (
      <div className='main' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${dynamicImageUrl})`}}>
        <div style={{height: '50px', width: '50px', borderRadius: '50px', marginTop: '10px', marginLeft: '10px',padding:'2px',border:'2px, solid, white', position: 'absolute'}}>
        <img style={{height: '50px', width: '50px', borderRadius: '50px'}} src={logo} alt="Logo" />
        </div>
        
        <div className='toggle-container'>
          <label className='switch'>
            <input type='checkbox' checked={isShared} onChange={handleToggle} />
            <span className='slider'>
              <span className='slider-label'>{isShared ? 'Shared' : 'Personal'}</span>
            </span>
          </label>
        </div>
            <div className='options'>
                <div className='sharedOptions'>
                <div className='clip'>Diary</div>
                <div className='clip' style={{background:'#4CAF50',color:'#fff'}}>ToDo</div>
                <div className='clip'>Timeline</div>
                <div className='clip'>Group Chat</div>
                <FontAwesomeIcon className='clipThreeDot' icon={faEllipsisV}/>
                </div>
            </div>
            <div className='contentArea'>
                {/* <Diary/> */}
                <ToDo/>
            </div>
      </div>
    );
  };
  
  export default Main;