import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { renderApi } from "../Atom/Atom";
import axios from "axios";
import { useState } from "react";
const Api = (props) => {
  const [rendapi, setapi] = useRecoilState(renderApi);
  const [p, setP] = useState();
  const a = useRecoilValue(renderApi);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/projects/findproject_by_id/${props.task}`, {})
      .then((res) => {
        setP(res.data.missions);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/projects/findproject_by_id/${props.task}`, {})
      .then((res) => {
        setP(res.data.missions);
      });
    setapi("false");
  }, [a === "true"]);
  const isBigScreen = useMediaQuery({ query: "(max-width: 741px)" });
  const numberPercent = (p) => {
    let amountTask = 0;
    let counter = 0;

    if (p?.length) {
      amountTask = p.length;
    }

    for (const key in p) {
      if (p[key].status === "פעיל") {
        counter++;
      }
    }
    if (counter === 0) return 100;
    else return Math.floor((amountTask - counter) * (100 / amountTask));
  };

  let dataUrl = {
    type: "progressBar",
    data: {
      datasets: [
        {
          data: [`${p && numberPercent(p)}`],
        },
      ],
    },
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop="14px"
        marginLeft={isBigScreen ? "84px" : ""}
        sx={{
          width: {
            xs: "100%", //0
            sm: "100%", //600
            md: "100%", //900
            lg: "100%", //1200
            xl: "100%", //1536
          },
        }}
      >
        {p && (
          <iframe
            src={`https://quickchart.io/chart?w=150&h=40&c=${JSON.stringify(
              dataUrl
            )}`}
            style={{ border: "0", width: 300, height: 80 }}
            title="Iframe Example"
          ></iframe>
        )}
        <Typography
          sx={{
            fontSize: 26,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "15px",
          }}
          color="text.secondary"
          gutterBottom
        >
          {":משימות שבוצעו"}
        </Typography>
      </Grid>
    </>
  );
};
export default Api;
