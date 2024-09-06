import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { updateAccountName } from '../../redux/user/userSlice';

const SignUp1 = () => {
  const [accountName, setAccountName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setAccountName(e.target.value);
  };

  const handleCheckAccount = async (e) => {
    e.preventDefault();

    if (!accountName) {
      setErrorMessage('Account name cannot be empty');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/account/check/not-exist/${accountName}`);
      
      // Check the API response
      if (response.data.not_exist) {
        // Dispatch the account name to Redux and navigate to the next step
        dispatch(updateAccountName({ accountName }));
        navigate('/sign-up-step2');
      } else {
        setErrorMessage('Account already exists');
      }

    } catch (error) {
      // Handle API errors (like 409 conflict)
      if (error.response && error.response.status === 409) {
        setErrorMessage('Account already exists');
      } else {
        setErrorMessage('An error occurred while checking the account');
      }
      console.error(error);
    }
  };

  return (
    <div className='signin_background'>
      <div className='box'>
        <div className='login'>
          SIGNUP
        </div>
        <div>
          <form className='checkAccount' onSubmit={handleCheckAccount}>
            <input
              placeholder='Account name'
              className='input'
              value={accountName}
              onChange={handleInputChange}
            />
            <button type='submit' className='checkAccountButton'>
              Create
            </button>
          </form>
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
        </div>
        <div className='routeToOther'>
          <div>
            <Link className='routeToOtherLink' to='/create-by-others'>
            <span className='linkText'>Account created by others, </span>
             <span className='link'>click here</span></Link>
          </div>
          <div>
          <Link className='routeToOtherLink' to='/sign-in'>
            <span className='linkText'>Already have an account, </span>
             <span className='link'>SignIn</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp1;
