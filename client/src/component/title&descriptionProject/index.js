import { MainDive, MainElement, DscriptionDive } from "./styled.index";
import { useMediaQuery } from "react-responsive";
export const TitleDescriptionProject = (props) => {
  const isBigScreen = useMediaQuery({ query: "(max-width: 741px)" });
  return (
    <>
      <MainDive style={{ width: isBigScreen ? "550px" : "" }}>
        <MainElement>
          <h2 style={{ marginRight: "15px" }}>{props.title}</h2>
          <DscriptionDive>{props.description}</DscriptionDive>
        </MainElement>
      </MainDive>
    </>
  );
};
