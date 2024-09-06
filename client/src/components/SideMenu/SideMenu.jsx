import React from 'react';
import axios from 'axios';
import './style.css'; // Ensure this CSS file is updated
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/user/userSlice';

const SideMenu = ({ isVisible, onClose }) => {
    const dispatch = useDispatch();
    
    const handleSignout = async () => {
        try {
            await axios.get('http://localhost:3001/api/auth/signout');
            dispatch(signOut());
            
        } catch (error) {
            console.error('Signout failed', error);
        }
    };

    return (
        <div className={`side-menu ${isVisible ? 'visible' : ''}`}>
            <button className="close-btn" onClick={onClose}>X</button>
            <div className="menu-items">
                <ul>
                    {/* Add more menu items here if needed */}
                    <li>Diary</li>
                    <li>ToDo</li>
                    <li>Timeline</li>
                    <li>Group Chat</li>
                </ul>
            </div>
            <div className="signout-container">
                <div className='signoutbutton' onClick={handleSignout}>Signout</div>
            </div>
        </div>
    );
};

export default SideMenu;
