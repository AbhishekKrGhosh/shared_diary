import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight, faFaceAngry } from '@fortawesome/free-solid-svg-icons'

const SignIn1 = () => {
  return (
    <div className='signin_background'>
      <div className='box'>
        <div className='login'>
          LOGIN
        </div>
        <div >
          <form className='checkAccount'>
            <input placeholder='account  name' className='input'/>
            <button className='checkAccountButton'><FontAwesomeIcon className='checkAccountButtonIcon' icon={faCircleRight} />
            </button>
          </form>
        </div>
        <div className='routeToOther'>
        <div>Account created by others, click here</div>
        <div>Don't have an acount, SignUp</div>
        </div>
      </div>
    </div>
  )
}

export default SignIn1