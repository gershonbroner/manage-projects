import React, { useState, useEffect } from "react";
import { Graf } from "../../component/graph";
import { HeaderPage } from "../../component/Header";
import BasicCard from "../../component/missionInProject";
import { ParticipantsInProject } from "../../component/participants";
import { TitleDescriptionProject } from "../../component/title&descriptionProject";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useRecoilState } from "recoil";
import { drawerState } from "../../component/Atom/Atom";
import { UpdateMission } from "../../component/updateMisssion";
import { useParams } from "react-router-dom";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useSlotProps } from "@mui/base";
import { useMediaQuery } from "react-responsive";
import Api from "../../component/api";
export const MissionsPage = () => {
  const isBigScreen = useMediaQuery({ query: "(max-width: 741px)" });
  const { id_project } = useParams();
  const [openDrawer, setOpenDrawer] = useRecoilState(drawerState);
  const [project, setProject] = useState([{}]);
  const [idMission, setIdMission] = useState();
  const [task, setTask] = useState(project.missions);

  const render = () => {
    axios
      .get(`http://localhost:5000/projects/findproject_by_id/${id_project}`, {})
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const HandleIdOfMission = (id) => {
    setIdMission(id);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const changeDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/projects/findproject_by_id/${id_project}`, {})
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const rende = () => {
    axios
      .get(`http://localhost:5000/projects/findproject_by_id/${id_project}`, {})
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteMission = (id) => {
    axios
      .delete(
        `http://localhost:5000/projects/removemission/${id_project}/${id}`,
        {}
      )
      .then(() => {
        axios
          .get(
            `http://localhost:5000/projects/findproject_by_id/${id_project}`,
            {}
          )
          .then((res) => {
            setProject(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {project.length > 0 && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <HeaderPage />
      <TitleDescriptionProject
        title={project.nameOfproject}
        description={project.description}
      />
      <ParticipantsInProject participants={project.participants} />
      <Api task={id_project} />
      <Box
        sx={{
          width: "100%",
          paddingTop: "100px",
        }}
      >
        <Grid
          container
          rowSpacing={6}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {project.missions?.map((mission) => {
            return (
              <Item
                sx={{
                  marginLeft: isBigScreen ? "200px" : "",
                  marginTop: "5px",
                }}
              >
                <BasicCard
                  description={mission.description}
                  participants={mission.participants}
                  delete={deleteMission}
                  id={mission._id}
                  sendIdOfcurrentMission={HandleIdOfMission}
                  status={mission.status}
                />
              </Item>
            );
          })}
        </Grid>
      </Box>
      <Drawer anchor={"right"} open={openDrawer} onClose={changeDrawer}>
        <UpdateMission
          idOfMission={idMission}
          project={project}
          idProject={id_project}
          render={render}
        />
      </Drawer>
    </>
  );
};
