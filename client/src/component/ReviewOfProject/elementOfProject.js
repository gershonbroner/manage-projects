import { ContainerOneProject } from "./styled.index";
import { useHistory } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
 
export const Project = (props) =>{
    const istory=useHistory();
    const go_to_missionPage = ()=>{
       istory.push(`/missionPage/${props.id}`)
    }
    return(
        <> 
        <ContainerOneProject onClick={go_to_missionPage}> 
         <CardContent> 
        <Typography  variant="h5" style={{paddingTop:"10px"}}>{props.title}</Typography>
        <Typography variant="body2">{props.description}</Typography>
         </CardContent>
         <Button size="small">כניסה לדף הפרוייקט</Button>
        </ContainerOneProject> 
        </>     
    );
};