import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight, faFaceAngry } from '@fortawesome/free-solid-svg-icons'

const SignUp1 = () => {
  return (
    <div className='signin_background'>
      <div className='box'>
        <div className='login'>
          SIGNUP
        </div>
        <div >
          <form className='checkAccount'>
            <input placeholder='account  name' className='input'/>
            <button className='checkAccountButton'>Create
            </button>
          </form>
        </div>
        <div className='routeToOther'>
        <div>Account created by others, click here</div>
        <div>Already have an account, SignIn</div>
        </div>
      </div>
    </div>
  )
}

export default SignUp1