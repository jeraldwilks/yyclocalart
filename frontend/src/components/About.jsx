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
  <Grid container spacing={6} justify="center">
    <Grid item xs={10} s={6} md={6}
    direction="row"
    maxWidth="425"
    justify="space-evenly"
    alignContent="center"
    alignItems="center"
    >
  {/* direction="row"
  rowSpacing={2}
  columnSpacing={{ xs: 12, sm: 6, md:6, lg: 6, xl: 6}}
  item
  // alignItems="center"
  // alignContent="center"
  // justify="center" */}
{teamMembers.map(createCard)}
  </Grid>
  </Grid>
);
}

export default AboutApp;