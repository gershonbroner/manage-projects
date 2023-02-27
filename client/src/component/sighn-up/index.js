import { ContaunerInput } from "../addUSER/styeld.index";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
export const Singhup = () => {
  const isBigScreen = useMediaQuery({ query: "(max-width: 741px)" });
  const [nameUser, setNameuser] = useState("");
  const [emailUser, setEmail] = useState("");
  const [passwordUser, settPassword] = useState("");
  const istory = useHistory();
  //   const [,] = useState();
  const onSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/users`, {
        name: nameUser,
        email: emailUser,
        pass: passwordUser,
        role: "worker",
      })
      .then((res) => {
        if (res.data === "1") {
          alert("EMAIL NEED @GMAIL.COM");
        } else {
          istory.push("/");
        }
      });
  };
  return (
    <div
      style={{
        width: isBigScreen ? "499px" : "1535px",
        height: isBigScreen ? "930px" : "719px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0px",
        background: "Aquamarine",
      }}
    >
      <ContaunerInput
        style={{
          height: "350px",
          borderRadius: "5px",
          background: "DarkSalmon",
        }}
      >
        <form onSubmit={onSubmitForm}>
          <div>
            <input
              style={{ height: "30px", width: "250px", marginTop: "70px" }}
              type="text"
              onChange={(e) => {
                setNameuser(e.target.value);
              }}
            />
            <dive style={{ marginLeft: "10px" }}>
              <label>:שם </label>
            </dive>
          </div>
          <div>
            <input
              style={{ height: "30px", width: "250px", marginTop: "30px" }}
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <dive style={{ marginLeft: "10px" }}>
              <label>:email </label>
            </dive>
          </div>
          <div>
            <input
              style={{ height: "30px", width: "250px", marginTop: "30px" }}
              type="text"
              onChange={(e) => {
                settPassword(e.target.value);
              }}
            />
            <dive style={{ marginLeft: "10px" }}>
              <label>:סיסמא</label>
            </dive>
          </div>

          <button
            style={{
              height: "30px",
              width: "150px",
              marginTop: "20px",
              marginLeft: "50px",
            }}
          >
            לחץ להוספת משתמש
          </button>
        </form>
      </ContaunerInput>
    </div>
  );
};
