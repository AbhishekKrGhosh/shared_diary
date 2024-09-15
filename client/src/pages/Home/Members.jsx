import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEllipsisV, faMinus } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import SideMenu from "../../components/SideMenu/SideMenu";

const Members = () => {
  const { accountName } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [render, setRender] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };
  useEffect(() => {
    const getEmails = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/account/${accountName}/emails`,{
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          },
        }
      );
      setEmailList(res.data.emails);
    };
    getEmails();
  }, [render]);

  const handleAddClick = async () => {
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/account/add-email`,
        {
          account_name: accountName,
          email,
        },{
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          },
        }
      );

      if (response.status === 200) {
        console.log("Email added successfully:", response.data);
        setEmail("");
        setShowInput(false);
        setRender(!render);
      }
    } catch (error) {
      console.error("Error adding email:", error);
      setError("Failed to add email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div
        style={{
          position: "absolute",
          display: "flex",
          width: "100vw",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50px",
            marginTop: "10px",
            marginLeft: "10px",
            padding: "2px",
            border: "2px solid white",
            display: "flex",
          }}
        >
          <img
            style={{ height: "50px", width: "50px", borderRadius: "50px" }}
            src={logo}
            alt="Logo"
          />
        </div>
        <h1
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "white",
            fontWeight: "900",
          }}
        >
          Shared Diary
        </h1>
        <div
          style={{
            height: "50px",
            width: "150px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onClick={handleMenuClick}
        >
          <FontAwesomeIcon
            style={{
              color: "white",
              marginRight: "30px",
              marginTop: "20px",
              height: "20px",
              width: "20px",
            }}
            icon={faEllipsisV}
          />
        </div>
      </div>
      <div className="homeContent" style={{ height: "100%" }}>
        <h1
          style={{
            textAlign: "center",
            textDecoration: "underline",
            marginBottom: "20px",
          }}
        >
          Existing Members
        </h1>
        <div style={{ marginBottom: "20px" }}>
          {emailList.map((item, index) => (
            <h2 key={index} style={{ textAlign: "center" }}>
              {item}
            </h2>
          ))}
        </div>
        <div className="addMembers">
          Add Members
          <div
            className="addIconContainer"
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? (
              <FontAwesomeIcon className="addIcon" icon={faMinus} />
            ) : (
              <FontAwesomeIcon className="addIcon" icon={faAdd} />
            )}
          </div>
        </div>

        {showInput && (
          <div className="inputContainer">
            <input
              type="email"
              placeholder="Enter email address"
              className="inputField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="addButton"
              onClick={handleAddClick}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        )}

        {error && <p className="error">{error}</p>}
        <SideMenu isVisible={menuVisible} onClose={handleCloseMenu} />
      </div>
    </div>
  );
};

export default Members;
