import {
  ButtonConnect,
  ContainerPage,
  DiveInput,
  StyleText,
} from "./styles.index";
import { useRecoilState } from "recoil";
import { isAdmin } from "../Atom/Atom";
import { ContainerLogin } from "./styles.index";
import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
export const Login = () => {
  const [inputUserName, setInputUserName] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [checkeAdmin, setIsAdmin] = useRecoilState(isAdmin);
  let isValid = false;
  const istory = useHistory();
  const postData = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/users/validuser", {
        userName: inputUserName,
        password: passwordUser,
      })
      .then(function (response) {
        isValid = response.data.istrue;
        const Admin = response.data.user[0].role;
        if (isValid === "true") {
          if (Admin === "manager") {
            setIsAdmin(true);
          }
          istory.push("/homepage");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ContainerPage>
      <ContainerLogin>
        <form>
          <DiveInput>
            {" "}
            <StyleText>UserName </StyleText>{" "}
            <input
              value={inputUserName}
              onChange={(e) => {
                setInputUserName(e.target.value);
              }}
            ></input>
          </DiveInput>
          <DiveInput>
            {" "}
            <StyleText>Password </StyleText>
            <input
              value={passwordUser}
              onChange={(e) => {
                setPasswordUser(e.target.value);
              }}
            ></input>
          </DiveInput>
          <ButtonConnect
            variant="contained"
            size="large"
            onClick={postData}
            disabled={!(inputUserName && passwordUser.length >= 3)}
          >
            LOGIN
          </ButtonConnect>
        </form>
        <Link to="/singhup" style={{ marginTop: "30px" }}>
          להרשמה לאתר לחץ כאן
        </Link>
      </ContainerLogin>
    </ContainerPage>
  );
};
