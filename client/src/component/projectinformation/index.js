import Card from "@mui/material/Card";
import { MainDive } from "./styled.index";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useRecoilValue } from "recoil";
import { isAdmin } from "../../component/Atom/Atom";
import { Drawer } from "@mui/material";
import { UpdateMission } from "../updateMisssion";
import { useState } from "react";
import { ContDrawer } from "./styled.index";
import { UpdateProject } from "../updateProject";
export const InfomationProject = (props) => {
  const admin = useRecoilValue(isAdmin);
  const [openDrawer, setOpendrawer] = useState(false);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const changestate = () => {
    props.funcId(props.id);
  };
  const handlerDeleteProject = () => {
    props.delete(props.id);
  };
  const hamdleDrawer = () => {
    setOpendrawer(true);
  };
  const changeDrawer = () => {
    setOpendrawer(false);
  };
  return (
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
        <Typography variant="h6">{props.nameOfproject}</Typography>
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
            {props.participants?.map((participant) => {
              return <Item>{participant._id.name}</Item>;
            })}
          </Stack>
        </div>
        <Button
          variant="outlined"
          size="small"
          sx={{
            height: "25px",
            marginTop: "15px",
            marginRight: "3px",
            background: "orange",
          }}
          onClick={handlerDeleteProject}
          disabled={!admin}
        >
          מחיקת פרוייקט
        </Button>
        <Button
          onClick={changestate}
          variant="outlined"
          size="small"
          sx={{
            height: "25px",
            marginTop: "15px",
            marginRight: "3px",
            background: "orange",
          }}
        >
          צפייה בפרטי הפרוייקט
        </Button>
        <Button
          onClick={hamdleDrawer}
          variant="outlined"
          size="small"
          sx={{
            height: "25px",
            marginTop: "15px",
            marginRight: "3px",
            background: "orange",
          }}
          disabled={!admin}
        >
          שינוי פרוייקט
        </Button>
      </Card>
      <Drawer anchor={"right"} open={openDrawer} onClose={changeDrawer}>
        <UpdateProject project={props.project} />
      </Drawer>
    </MainDive>
  );
};
