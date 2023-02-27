import { MainDive, SingleParticipants } from "./styled.index";
import { useMediaQuery } from "react-responsive";
export const ParticipantsInProject = (props) => {
  const isBigScreen = useMediaQuery({ query: "(max-width: 741px)" });
  return (
    <>
      <MainDive style={{ width: isBigScreen ? "553px" : "" }}>
        {props.participants?.map((participant) => {
          return (
            <SingleParticipants>{participant._id.name}</SingleParticipants>
          );
        })}
      </MainDive>
    </>
  );
};
