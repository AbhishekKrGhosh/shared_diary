import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight, faFaceAngry } from '@fortawesome/free-solid-svg-icons'
import google from '../../assets/images/google.png'

const SignIn2 = () => {
  return (
    <div className='signin_background'>
      <div className='box'>
        <div className='login'>
          LOGIN
        </div>
        <div className='checkAccountContainer'>
          <form className='checkAccount'>
            <input placeholder='email' className='input'/>
            <input placeholder='password' className='input'/>
            <button className='checkAccountButton'>Login
            </button>
          </form>
          or
          <button className='google'><img className='googleLogo' src={google}/></button>
        </div>
        <div className='routeToOther'>
        <div>Account created by others, click here</div>
        <div>Don't have an acount, SignUp</div>
        </div>
      </div>
    </div>
  )
}

export default SignIn2