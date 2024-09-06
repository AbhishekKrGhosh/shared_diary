import React, { useState } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { updateAccountName } from '../../redux/user/userSlice'  // Adjust the path as needed
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const SignIn1 = () => {
  const [accountName, setAccountName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setAccountName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`http://localhost:3001/api/account/check/${accountName}`)
      if (response.data.exists) {
        dispatch(updateAccountName({ accountName }))
        navigate('/sign-in-step2')
      } else {
        alert('Account does not exist')
      }
    } catch (error) {
      console.error('Error checking account:', error)
      alert('An error occurred')
    }
  }

  return (
    <div className='signin_background'>
      <div className='box'>
        <div className='login'>
          LOGIN
        </div>
        <div>
          <form className='checkAccount' onSubmit={handleSubmit}>
            <input 
              placeholder='account name' 
              className='input' 
              value={accountName} 
              onChange={handleInputChange}
            />
            <button type='submit' className='checkAccountButton'>
              <FontAwesomeIcon className='checkAccountButtonIcon' icon={faCircleRight} />
            </button>
          </form>
        </div>
        <div className='routeToOther'>
          <div>
            <Link className='routeToOtherLink' to='/create-by-others'>
            <span className='linkText'>Account created by others, </span>
             <span className='link'>click here</span></Link>
          </div>
          <div>
          <Link className='routeToOtherLink' to='/sign-up'>
            <span className='linkText'>Don't have an account, </span>
             <span className='link'>SignUp</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn1
