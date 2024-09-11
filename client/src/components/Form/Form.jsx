import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './style.css';
import { toggle, setEditMode, setCurrentDiary, resetCurrentDiary } from '../../redux/user/userSlice';

const Form = () => {
  const dispatch = useDispatch();
  const { accountName, currentUser, editMode, currentDiary } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    tags: ''
  });

  useEffect(() => {
    if (editMode && currentDiary) {
      setFormData({
        title: currentDiary.title,
        description: currentDiary.description,
        location: currentDiary.location,
        tags: currentDiary.tags.join(', ')
      });
    }
  }, [editMode, currentDiary]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(`https://shared-diary-1.onrender.com/api/account/diaries/${accountName}/${currentDiary._id}`, {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim())
        });
        dispatch(setEditMode(false));
        dispatch(resetCurrentDiary());
      } else {
        await axios.post('https://shared-diary-1.onrender.com/api/account/diaries', {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          account_name: accountName,
          email: currentUser
        });
      }

      setFormData({
        title: '',
        description: '',
        location: '',
        tags: ''
      });

      dispatch(toggle());

    } catch (error) {
      console.error('Error saving/updating diary', error);
    }
  };

  return (
    <div className='form'>
      <div className='box2'>
        <div className='login2'>
          {editMode ? 'EDIT DIARY' : 'CREATE'}
        </div>
        <div className='checkAccountContainer2'>
          <form className='checkAccount2' onSubmit={handleSubmit}>
            <input name="title" value={formData.title} placeholder='Title' className='input2' onChange={handleChange} />
            <input name="description" value={formData.description} placeholder='Description' className='input2 desc' onChange={handleChange} />
            <input name="location" value={formData.location} placeholder='Location' className='input2' onChange={handleChange} />
            <input name="tags" value={formData.tags} placeholder='Tags' className='input2' onChange={handleChange} />
            <button className='checkAccountButton2'>
              {editMode ? 'Update' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
