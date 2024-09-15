import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import Card from "../Card/Card";

const Cards = () => {
  const { accountName, flag } = useSelector((state) => state.user);
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/account/diaries/${accountName}`,{
            headers: {
              'x-api-key': import.meta.env.VITE_API_KEY
            },
          }
        );
        setDiaries(response.data.reverse());
      } catch (error) {
        console.error("Error fetching diaries", error);
      }
    };
    fetchDiaries();
  }, [accountName, flag]);

  return (
    <div className="cards">
      {diaries.map((diary) => (
        <Card key={diary._id} diary={diary} />
      ))}
    </div>
  );
};

export default Cards;
