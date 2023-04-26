import teamMembers from "../teamMembers";
import AboutCard from "./AboutCard"
import { Grid } from "@mui/material";


function createCard(teamMember) {
  return (
    <AboutCard
    key={teamMember.id}
    name={teamMember.name}
    email={teamMember.email}
    />
  );
}

function AboutApp() {
console.log(teamMembers);

return (
  <Grid container spacing={4} rowSpacing={2} columnSpacing={{ xs: 1, sm: 4, md: 6}}>
{teamMembers.map(createCard)}
  </Grid>
);
}

export default AboutApp;