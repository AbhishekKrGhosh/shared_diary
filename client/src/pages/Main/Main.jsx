import React, { useEffect, useState } from 'react'
import './style.css'
import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Diary from '../../components/Diary/Diary'
import SideMenu from '../../components/SideMenu/SideMenu'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { updateAccountDetails } from '../../redux/user/userSlice'


const Main = () => {
  const {theme, color, accountName} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const dynamicImageUrl = theme;
  const [isShared, setIsShared] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [render, setRender] = useState(false)

  const handleToggle = () => {
    setIsShared(!isShared);
  };

  const handleMenuClick = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };
  useEffect(()=>{
    const getaAndUpdateTheme = async ()=>{
      console.log(accountName)
      const res = await axios.get(`https://shared-diary-1.onrender.com/api/account/${accountName}/theme`)
      dispatch(updateAccountDetails({color, theme:res.data}))
      setRender(!render)
    }
    getaAndUpdateTheme()
  },[theme,render])

  return (
    <div className='main' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${dynamicImageUrl})` }}>
      <div style={{position: 'absolute', display:'flex', width:'100vw', justifyContent:'space-between', alignItems:'center'}}>
      <div style={{ height: '50px', width: '50px', borderRadius: '50px', marginTop: '10px', marginLeft: '10px', padding: '2px', border: '2px solid white', display:'flex' }}>
        <img style={{ height: '50px', width: '50px', borderRadius: '50px' }} src={logo} alt="Logo" />
      </div>
      <h1 style={{textAlign:'center', marginTop:'10px', color:'white', fontWeight:'900'}}>Shared Diary</h1>
      <div style={{height:'50px', width:'150px', display:'flex', justifyContent:'flex-end', alignItems:'center'}} onClick={handleMenuClick}>
      <FontAwesomeIcon style={{color:'white', marginRight:'30px', marginTop:'20px', height:'20px', width:'20px'}} icon={faEllipsisV} />
      </div>
      </div>
      
      {/* <div className='toggle-container'>
        <label className='switch'>
          <input type='checkbox' checked={isShared} onChange={handleToggle} />
          <span className='slider'>
            <span className='slider-label'>{isShared ? 'Shared' : 'Personal'}</span>
          </span>
        </label>
      </div> */}
      
      {/* <div className='options'>
        <div className='sharedOptions'>
          <div className='clip' style={{ background: '#4CAF50', color: '#fff' }}>Shared Diary</div>
          <div className='clip'>ToDo</div>
          <div className='clip'>Timeline</div>
          <div className='clip'>Group Chat</div>
          <FontAwesomeIcon className='clipThreeDot' icon={faEllipsisV} onClick={handleMenuClick} />
        </div>
      </div> */}

      <div className='contentArea'>
        <Diary/>
      </div>

      <SideMenu isVisible={menuVisible} onClose={handleCloseMenu} />
    </div>
  );
};

export default Main;