import React from 'react'
import './style.css'
import Cards from '../Cards/Cards'
import Form from '../Form/Form'
import { useSelector } from 'react-redux'

const Diary = () => {
  return (
    <div className='diary'>
        <Cards/>
        <Form/>
    </div>
  )
}

export default Diary