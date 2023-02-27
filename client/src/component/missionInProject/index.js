import Card from "@mui/material/Card";
import { MainDive } from "./styled.index";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { drawerState } from "../Atom/Atom";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isAdmin } from "../../component/Atom/Atom";
import { useState } from "react";
import { renderApi } from "../Atom/Atom";
export default function BasicCard(props) {
  //const a = props.status === "פעיל" ? true : false;
  let change = "פעיל";
  const [rendapi, setapi] = useRecoilState(renderApi);
  const [istrue, setis] = useState(props.status === "פעיל" ? true : false);
  const admin = useRecoilValue(isAdmin);
  const [drawer, setDrawer] = useRecoilState(drawerState);
  const [statusw, setstatus] = useState(props.status);
  const sendDeleteMission = () => {
    props.delete(props.id);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const changeStatus = () => {
    if (statusw === "פעיל") {
      change = "לא פעיל";
    }
    axios.post(`http://localhost:5000/projects/changestatus/${props.id}`, {
      status: change,
    });
    // setis(!istrue);
    setstatus(() => {
      if (statusw === "פעיל") {
        return "לא פעיל";
      } else {
        return "פעיל";
      }
    });
    setapi("true");
  };
  return (
    <>
      {<Typography size="small">{statusw}</Typography>}
      <MainDive>
        <Card
          variant="outlined"
          sx={{
            width: "500px",
            height: "200px",
            textAlign: "center",
            background: "#ccfff5",
          }}
        >
          <Typography variant="h6">תיאור משימה</Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "blue",
            }}
          >
            {props.description}
          </Typography>
          <Typography>משתתפים</Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <Stack direction="row" spacing={2}>
              {props.participants.map((p) => {
                return <Item>{p._id.name}</Item>;
              })}
            </Stack>
          </div>
          {/* <Button
          variant="outlined"
          size="small"
          onClick={sendDeleteMission}
          sx={{
            height: "25px",
            marginTop: "15px",
            marginRight: "3px",
            background: "orange",
          }}
          disabled={!admin}
        >
          מחיקת משימה
        </Button> */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              props.sendIdOfcurrentMission(props.id);
              setDrawer(true);
            }}
            sx={{
              height: "25px",
              marginTop: "15px",
              background: "orange",
              marginRight: "85px",
              marginTop: "32px",
            }}
            disabled={!admin}
          >
            עדכון משימה
          </Button>

          {istrue && (
            <Switch
              disabled={!admin}
              sx={{
                marginLeft: "260px",
                marginTop: "45px",
              }}
              defaultChecked
              size="small"
              onChange={changeStatus}
            />
          )}
          {!istrue && (
            <Switch
              disabled={!admin}
              sx={{
                marginLeft: "260px",
                marginTop: "45px",
              }}
              size="small"
              onChange={changeStatus}
              // props.render();
            />
          )}
        </Card>
      </MainDive>
    </>
  );
}
