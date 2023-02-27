import styled from "styled-components";
import Button from "@mui/material/Button";

export const ContainerPage = styled.div`
  width: 100%;
  height: 723px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #54cac8;
`;

export const ContainerLogin = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: solid 5px;
  border-color: black;
  border-radius: 3px;
  background: white;
`;
export const ButtonConnect = styled(Button)`
  && {
    margin-left: 46px;
  }
`;

export const DiveInput = styled.div`
  width: 200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyleText = styled.text`
  font-size: medium;
  color: blue;
  margin-right: 5px;
`;
