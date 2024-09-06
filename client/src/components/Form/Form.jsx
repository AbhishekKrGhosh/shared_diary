import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight, faFaceAngry } from '@fortawesome/free-solid-svg-icons'
import google from '../../assets/images/google.png'

const Form = () => {
  return (
    <div className='form'>
      <div className='box2'>
        <div className='login2'>
          CREATE
        </div>
        <div className='checkAccountContainer2'>
          <form className='checkAccount2'>
            <input placeholder='title' className='input2'/>
            <input placeholder='details' className='input2'/>
            <input placeholder='location' className='input2'/>
            <input placeholder='tags' className='input2'/>
            <input placeholder='notes' className='input2'/>
            <button className='checkAccountButton2'>Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form