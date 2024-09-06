import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateAccountRoute2 = () => {
    const {accountName} = useSelector(state=>state.user)
  return accountName ? <Outlet/> : <Navigate to='/sign-up'/>
}

export default PrivateAccountRoute2