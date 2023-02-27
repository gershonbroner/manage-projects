import React, { useState, useEffect } from "react";
import { ContainerUpdate, Input, Text } from "./styled.index";
import { Button } from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { drawerState } from "../../component/Atom/Atom";
export const UpdateMission = (props) => {
  const [input, setInput] = useState(false);
  const [missionSelect, setMission] = useState({});
  const [description, setDescription] = useState();
  const [newUserJoin, setNewUserJoin] = useState();
  const [idParticipants, setIdParticipants] = useState();
  const [drewer, setDrawer] = useRecoilState(drawerState);
  const handleUpdate = () => {
    axios
      .post(
        `http://localhost:5000/projects/updateProject/${props.idProject}/${props.idOfMission}/${description}`,
        {}
      )
      .then(() => {
        props.render();
      });
    setDrawer(!drewer);
  };
  const OpenInput = () => {
    setInput(!input);
  };

  const handleSelectMission = () => {
    props.project.missions?.map((mission) => {
      if (mission._id === props.idOfMission) {
        setMission(mission);
      }
    });
  };
  const handlerDeletePaticipants = (participant) => {
    axios
      .post(
        `http://localhost:5000/projects/removeuser/${props.idProject}/${props.idOfMission}/${participant}`,
        {}
      )
      .then(() => {
        props.render();
      });
    setDrawer(!drewer);
  };
  const joinuser = () => {
    axios
      .post(
        `http://localhost:5000/projects/adduser/${props.idProject}/${props.idOfMission}/${newUserJoin}`,
        {}
      )
      .then(() => {
        setInput(!input);
        props.render();
      });
    setDrawer(!drewer);
    console.log(newUserJoin);
  };
  useEffect(() => {
    handleSelectMission();
  }, []);
  console.log(missionSelect);
  return (
    <>
      <ContainerUpdate
        variant="outlined"
        sx={{
          width: "500px",
          height: "459px",
          textAlign: "center",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text variant="h5">תיאור משימה</Text>
        <Input
          Value={description}
          multiline
          rows={4}
          sx={{
            width: "360px",
          }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></Input>
        <Button
          variant="outlined"
          size="small"
          sx={{
            height: "25px",
            marginTop: "15px",
            marginRight: "3px",
            background: "orange",
          }}
          onClick={handleUpdate}
        >
          עדכון
        </Button>
        <Text variant="h5">משתתפים</Text>
        {missionSelect?.participants?.map((participant) => {
          return (
            <Button
              variant="outlined"
              size="small"
              sx={{
                height: "25px",
                marginTop: "15px",
                marginRight: "3px",
                background: "#ccfff5",
              }}
              onClick={() => {
                handlerDeletePaticipants(participant._id._id);
              }}
            >
              {participant._id.name}
            </Button>
          );
        })}

        {!input && (
          <Button
            variant="outlined"
            size="small"
            sx={{
              width: "100px",
              height: "50px",
              marginTop: "15px",
              marginRight: "3px",
            }}
            onClick={OpenInput}
          >
            הוספת משתתף חדש
          </Button>
        )}
        {input && (
          <Input
            variant="standard"
            multiline
            defaultValue=""
            label="משתתף חדש"
            sx={{
              width: "110px",
              marginTop: "10px",
            }}
            onChange={(e) => {
              setNewUserJoin(e.target.value);
            }}
          ></Input>
        )}
        {input && (
          <Button
            variant="outlined"
            size="small"
            sx={{
              marginTop: "20px",
            }}
            onClick={joinuser}
          >
            צרף
          </Button>
        )}
      </ContainerUpdate>
    </>
  );
};
