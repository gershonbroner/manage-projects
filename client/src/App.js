import { Route } from "react-router-dom";
import { HomePage } from "./pagees/homepage";
import { Commander } from "./pagees/commanderpage";
import LoginPage from "./pagees/loginPage";
import { MissionsPage } from "./pagees/missionsProject";
import { RecoilRoot } from "recoil";
import { Singhup } from "./component/sighn-up";
function App() {
  return (
    <RecoilRoot>
      <Route path={"/"} exact>
        <LoginPage />
      </Route>

      <Route path={"/homepage"}>
        <HomePage />
      </Route>

      <Route path={"/commanderPage"}>
        <Commander />
      </Route>

      <Route path={"/missionPage/:id_project"}>
        <MissionsPage />
      </Route>

      <Route path={"/singhup"}>
        <Singhup />
      </Route>
    </RecoilRoot>
  );
}
export default App;
