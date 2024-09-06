import React, { useState } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight, faFaceAngry } from '@fortawesome/free-solid-svg-icons'
import google from '../../assets/images/google.png'
import { Link, useNavigate } from 'react-router-dom'
import OAuth3 from '../../components/OAuth/OAuth3'
import { signInSuccess, updateAccountInfo } from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const AccountByOthers2 = () => {
  const {accountName} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value})
  }
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      console.log(formData)
      const res = await axios.post('http://localhost:3001/api/auth/signup', formData);
      const data = res
      setLoading(false)
      console.log(data)
      if(data.success===false){
        setError(true)
        return
      }
      try {
        let mail = formData.email
        const res = await axios.get(`http://localhost:3001/api/account/${accountName}/email/${mail}`)
        dispatch(signInSuccess(data.email))
        console.log("accountName: ",accountName, "| mail: ",mail)
        dispatch(updateAccountInfo({accountName, mail}))
        navigate('/home2')
    } catch (error) {
        console.log('invalid access: ',error)
        dispatch(signInFailure(data))
    }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
    }
  }
  return (
    <div className='signin_background'>
      <div className='box'>
        <div className='login'>
            SIGNUP
        </div>
        <div className='account-by-other-text'>
            (for account created by others)
        </div>
        <div style={{textAlign:'center'}}>(if you already have another account on SharedDiary, kindly use your old password)</div>
        <div className='checkAccountContainer'>
        <form onSubmit={handleSubmit} className='checkAccount'>
          <input type='text' placeholder='name' id='name' onChange={handleChange} className='input'/>
            <input type='email' placeholder='Email' id='email' onChange={handleChange} className='input'/>
            <input type='password' placeholder='Password' id='password' onChange={handleChange} className='input'/>
            <button disabled={loading} className='checkAccountButton'>{loading?'Loading...':'SignUp'}
            </button>
          </form>
          or
          <OAuth3/>
        </div>
        <div className='routeToOther'>
          <div>
          <Link className='routeToOtherLink' to='/sign-in'>
            <span className='linkText'>Already have an account, </span>
             <span className='link'>SignIn</span></Link>
          </div>
          <div>
            <Link className='routeToOtherLink' to='/sign-up'>
            <span className='linkText'>Don't have an acount, </span>
             <span className='link'>SignUp</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountByOthers2