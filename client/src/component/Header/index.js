import {
  UpDiveHeader,
  InnerDivHeader,
  SecondDive,
  HeaderStyle,
} from "./styled";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAdmin } from "../Atom/Atom";
import { useMediaQuery } from "react-responsive";
import { blue } from "@mui/material/colors";
export const HeaderPage = (props) => {
  const isadmin = useRecoilValue(isAdmin);
  const isBigScreen = useMediaQuery({ query: "(max-width: 741px)" });
  return (
    <dive style={{ background: "blue", width: "500px" }}>
      <HeaderStyle
        style={{
          background: isBigScreen ? "white" : "",
          boxShadow: isBigScreen ? "0 0 0 0" : "",
        }}
      >
        <UpDiveHeader>
          <InnerDivHeader>
            <div>
              <h3>{props.des ? props.des : "   ניהול משימות ופרוייקטים"}</h3>
            </div>
          </InnerDivHeader>
        </UpDiveHeader>
        <SecondDive>
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Hatal.png/270px-Hatal.png"
              alt="חטל"
              width="40"
              height="40"
            />
          </div>
          <div
            style={{
              width: "65px",
              paddingLeft: "37px",
              color: "white",
            }}
          >
            {isadmin && (
              <Link
                to="/commanderPage"
                style={{ textDecoration: "none", color: "black" }}
              >
                דף מפקד
              </Link>
            )}
          </div>
        </SecondDive>
      </HeaderStyle>
    </dive>
  );
};
