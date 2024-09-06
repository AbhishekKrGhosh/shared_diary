import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateAccountRoute3 = () => {
    const {accountName} = useSelector(state=>state.user)
  return accountName ? <Outlet/> : <Navigate to='/create-by-others'/>
}

export default PrivateAccountRoute3