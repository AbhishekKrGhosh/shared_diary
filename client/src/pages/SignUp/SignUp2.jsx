import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight, faFaceAngry } from '@fortawesome/free-solid-svg-icons'
import google from '../../assets/images/google.png'

const SignUp2 = () => {
  return (
    <div className='signin_background'>
      <div className='box'>
        <div className='login'>
            SIGNUP
        </div>
        <div className='checkAccountContainer'>
          <form className='checkAccount'>
          <input placeholder='name' className='input'/>
            <input placeholder='email' className='input'/>
            <input placeholder='password' className='input'/>
            <input placeholder='confirm password' className='input'/>
            <button className='checkAccountButton'>SignUp
            </button>
          </form>
          or
          <button className='google'><img className='googleLogo' src={google}/></button>
        </div>
        <div className='routeToOther'>
        <div>Account created by others, click here</div>
        <div>Already have an account, SignIn</div>
        </div>
      </div>
    </div>
  )
}

export default SignUp2