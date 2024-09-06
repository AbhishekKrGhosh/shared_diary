import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'

const ToDo = () => {
  const {accountName, currentUser} = useSelector(state=>state.user)
  return (
    <div className='todoContainer'>
        <div className='todoBox'>
            ToDo for accountName:{accountName} and currentUser:{currentUser}
        </div>
    </div>
  )
}

export default ToDo