import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateAccountRoute = () => {
    const {accountName} = useSelector(state=>state.user)
  return accountName ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default PrivateAccountRoute