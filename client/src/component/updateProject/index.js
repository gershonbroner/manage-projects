import { ContDrawer } from "../projectinformation/styled.index";
import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { ContainerUpdate, Input, Text } from "../updateMisssion/styled.index";
export const UpdateProject = (props) => {
  const [project, setProject] = useState();
  const [input, setInput] = useState(false);
  const [description, setDescription] = useState();
  const [newUserJoin, setNewUserJoin] = useState();
  const [mission, setMission] = useState();
  const [participantsMission, setParti] = useState();
  const [allparticipantsMission, setllParti] = useState([]);
  const OpenInput = () => {
    setInput(!input);
  };
  //
  const handleUpdate = () => {
    axios
      .post(
        `http://localhost:5000/projects/changedescriptionproject/${project._id}/${description}`,
        {}
      )
      .then(() => {});
  };
  //
  const handlerDeletePaticipants = (participant) => {
    axios
      .post(
        `http://localhost:5000/projects/removeusermission/${project._id}/${participant}`,
        {}
      )
      .then(() => {});
  };
  //
  const joinuser = () => {
    axios
      .post(
        `http://localhost:5000/projects/addusertoproject/${project._id}/${newUserJoin}`,
        {}
      )
      .then(() => {
        setInput(!input);
      });
  };
  //
  const addParticipantstomission = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/projects/finduser/${participantsMission}`)
      .then((res) => {
        setllParti([...allparticipantsMission, { _id: res.data }]);
      });
  };
  //
  const addMission = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/projects/addmission/${project._id}`, {
      description: mission,
      participants: allparticipantsMission,
      status: "פעיל",
    });
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/projects/findproject_by_id/${props.project._id}`,
        {}
      )
      .then((res) => {
        setProject(res.data);
      });
  }, []);
  console.log(project);
  return (
    <ContainerUpdate
      variant="outlined"
      sx={{
        width: "500px",
        height: "590px",
        textAlign: "center",
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>{project ? ` פרוייקט ${project.nameOfproject}` : ""}</h3>

      <Input
        Value={description}
        multiline
        rows={1}
        placeholder={"עדכון תיאור פרוייקט"}
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
      <Text variant="h5" sx={{ marginTop: "10px" }}>
        משתתפים
      </Text>
      {project?.participants?.map((participant) => {
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
              handlerDeletePaticipants(participant._id.name);
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
      <input
        style={{ marginTop: "12px" }}
        onChange={(e) => {
          setMission(e.target.value);
        }}
      ></input>
      <label>הוספת משימה</label>
      <input
        onChange={(e) => {
          setParti(e.target.value);
        }}
      ></input>
      <label>הוספת משתתפים</label>
      <Button onClick={addParticipantstomission}>צרף</Button>
      <button onClick={addMission}>הוסף משימה</button>
    </ContainerUpdate>
  );
};
