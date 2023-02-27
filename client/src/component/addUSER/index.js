import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ContaunerInput } from "./styeld.index";
import Divider from "@mui/material/Divider";
import { HeaderPage } from "../Header";
import { useMediaQuery } from "react-responsive";
export const ManagerProjects = () => {
  const [nameProject, setNameProject] = useState("");
  const [descriptionProject, setdescriptionProject] = useState("");
  const [descriptionMission, setdescriptionMission] = useState("");
  const [participantsProject, setparticipantsProject] = useState();
  const [allParticipants, setAllParticipants] = useState([]);
  const [participantsMission, setparticipantsMission] = useState();
  const [allParticipantsMission, setAllParticipantsMission] = useState([]);
  const [missionProject, setMissionProject] = useState({});
  const [allMissions, setAllMissions] = useState([]);
  const isBigScreen = useMediaQuery({ query: "(max-width: 741px)" });
  // const part = [
  //   { _id: "63985f65b091d919a754b379" },
  //   { _id: "63985f65b091d919a754b379" },
  //   { _id: "63985f65b091d919a754b379" },
  // ];
  const onSubmitForm = (e) => {
    console.log(e.target);
    e.preventDefault();

    axios
      .post("http://localhost:5000/projects", {
        nameOfproject: nameProject,
        description: descriptionProject,
        participants: [...allParticipants],
        missions: [...allMissions],
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //  axios.post("http://localhost:5000/projects", {
  //     nameOfproject: "new",
  //     description: "new",
  //     participants: [],
  //     missions: [
  //       {
  //         description: "new",
  //         participants: [],
  //       },
  //     ],
  //   }).then((res)=>{

  //   });
  const finduser = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/projects/finduser/${participantsProject}`)
      .then((res) => {
        setAllParticipants([...allParticipants, { _id: res.data }]);
      });
  };
  const finduserformission = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/projects/finduser/${participantsMission}`)
      .then((res) => {
        setAllParticipantsMission([
          ...allParticipantsMission,
          { _id: res.data },
        ]);
      });
  };
  const addMissionToProject = (e) => {
    e.preventDefault();
    setAllMissions([
      ...allMissions,
      {
        description: descriptionMission,
        participants: allParticipantsMission,
        status: "פעיל",
      },
    ]);
    setAllParticipantsMission([]);
  };
  return (
    <>
      <HeaderPage des={"הוספת פרוייקט"} />
      <div
        style={{
          width: isBigScreen ? "600px" : "1600px",
          height: isBigScreen ? "1179px" : "660px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e6e6fa",
        }}
      >
        <ContaunerInput>
          <form onSubmit={onSubmitForm}>
            <div>
              <input
                style={{ height: "30px", width: "250px", marginTop: "30px" }}
                type="text"
                onChange={(e) => {
                  setNameProject(e.target.value);
                }}
              />
              <dive style={{ marginLeft: "10px" }}>
                <label>:שם הפרוייקט</label>
              </dive>
            </div>
            <div>
              <input
                style={{ height: "30px", width: "250px", marginTop: "30px" }}
                type="text"
                onChange={(e) => {
                  setdescriptionProject(e.target.value);
                }}
              />
              <dive style={{ marginLeft: "10px" }}>
                <label>:תיאור הפרוייקט</label>
              </dive>
            </div>
            <div>
              <input
                style={{ height: "30px", width: "250px", marginTop: "30px" }}
                type="text"
                onChange={(e) => {
                  setparticipantsProject(e.target.value);
                }}
              />
              <dive style={{ marginLeft: "10px" }}>
                <label>:משתתפים בפרוייקט</label>
              </dive>
            </div>
            <button onClick={finduser}>הוסף משתמש</button>
            <div>
              <Divider sx={{ marginTop: "10px", color: "ActiveBorder" }} />
              <input
                style={{ height: "30px", width: "250px", marginTop: "30px" }}
                type="text"
                onChange={(e) => {
                  setdescriptionMission(e.target.value);
                }}
              />
              <dive style={{ marginLeft: "10px" }}>
                <label>:תיאור משימה</label>
              </dive>
            </div>
            <div>
              <input
                style={{ height: "30px", width: "250px", marginTop: "30px" }}
                type="text"
                onChange={(e) => {
                  setparticipantsMission(e.target.value);
                }}
              />
              <dive style={{ marginLeft: "10px" }}>
                <label>:משתתפים במשימה</label>
              </dive>
            </div>
            <button onClick={finduserformission}>הוסף משתמש</button>

            <div
              style={{
                marginTop: "30px",
                marginBottom: "50px",
                marginLeft: "46px",
              }}
            >
              <button
                onClick={addMissionToProject}
                style={{ height: "30px", width: "150px" }}
              >
                הוסף משימה
              </button>
            </div>
            <Divider sx={{ marginBottom: "80px", color: "ActiveBorder" }} />
            <button
              style={{ height: "30px", width: "250px", marginLeft: "40px" }}
            >
              לחץ להוספת הפרוייקט
            </button>
          </form>
          {/* <Link to="/homepage" style={{ marginRight: "160px" }}>
            חזרה לדף הבית
          </Link> */}
        </ContaunerInput>
      </div>
    </>
  );
};
