import { MainDive, Mainelement, TheGraf } from "./styled.index";
import { useMediaQuery } from "react-responsive";
export const Graf = () => {
  const isBigScreen = useMediaQuery({ query: "(max-width: 741px)" });
  return (
    <>
      <MainDive style={{ width: isBigScreen ? "519px" : "" }}>
        <Mainelement>
          <TheGraf></TheGraf>
        </Mainelement>
      </MainDive>
    </>
  );
};
