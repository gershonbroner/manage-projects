import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { HeaderPage } from "../../component/Header";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import { isAdmin } from "../../component/Atom/Atom";
import { InfomationProject } from "../../component/projectinformation";
import { buttonUseIstory } from "../../component/Atom/Atom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
// import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
export const HomePage = () => {
  const isBigScreen = useMediaQuery({ query: "(max-width: 741px)" });
  const isadmin = useRecoilValue(isAdmin);
  console.log(isadmin);
  const [projectsData, setProjectsData] = useState([{}]);
  let history = useHistory();
  const sendId = (idProject) => {
    history.push(`/missionPage/${idProject}`);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/projects", {})
      .then((res) => {
        setProjectsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  // api
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=tel-aviv&appid=cc26dccf73bcb437bd39947c6214afe8",
        {}
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //
  const deleteProject = (idProject) => {
    axios
      .delete(`http://localhost:5000/projects/removeproject/${idProject}`, {})
      .then(() => {
        axios
          .get("http://localhost:5000/projects", {})
          .then((res) => {
            setProjectsData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  return (
    <>
      <HeaderPage></HeaderPage>
      <div
        style={{
          width: isBigScreen ? "533px" : "100%",
          hight: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffff99",
          marginTop: "10px",
        }}
      >
        <Typography variant="h5">ניהול פרוייקטים</Typography>
      </div>
      <Box
        sx={{
          width: "100%",
          paddingTop: "100px",
          marginLeft: isBigScreen ? "90px" : "",
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
          {projectsData.map((project) => {
            return (
              <Item style={{ marginTop: "5px" }}>
                <InfomationProject
                  id={project._id}
                  nameOfproject={project.nameOfproject}
                  description={project.description}
                  participants={project.participants}
                  funcId={sendId}
                  delete={deleteProject}
                  project={project}
                />
              </Item>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};
