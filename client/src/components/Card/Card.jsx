import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  setEditMode,
  setCurrentDiary,
  toggle,
} from "../../redux/user/userSlice";
import {
  faDeleteLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL); 

const Card = ({ diary }) => {
  const { color, accountName, currentUser } = useSelector(
    (state) => state.user
  );
  const [newColor, setNewColor] = useState(color);
  const dispatch = useDispatch();
  console.log(diary.email);
  useEffect(() => {
    const getColor = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/account/${accountName}/color/${
          diary.email
        }`,{
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          },
        }
      );
      setNewColor(res.data.color);
    };
    getColor();
    socket.on('update', getColor);

    return () => {
      socket.off('update', getColor);
    };
  }, [newColor]);
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/account/diaries/${accountName}/${
          diary._id
        }`,{
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          },
        }
      );
      dispatch(toggle());
    } catch (error) {
      console.error("Error deleting diary", error);
    }
  };

  const handleEdit = () => {
    dispatch(setEditMode(true));
    dispatch(setCurrentDiary(diary));
  };

  return (
    <div className="card" style={{ background: `${newColor}` }}>
      <div className="title">{diary.title}</div>
      <div className="description">{diary.description.slice(0, 400)}</div>
      <div style={{ width: "100%" }}>
        <div className="tags">
          {diary.tags[0] ? "#" : ""}
          {diary.tags.join(" #")}
        </div>
        <div className="location">
          {diary.location ? "@" : ""}
          {diary.location}
        </div>
      </div>
      {currentUser == diary.email ? (
        <div className="actions">
          <div onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div onClick={handleDelete}>
            <FontAwesomeIcon color="red" icon={faTrash} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Card;
