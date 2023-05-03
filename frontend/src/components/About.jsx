import teamMembers from "../teamMembers";
import AboutCard from "./AboutCard";
import { Grid } from "@mui/material";

function createCard(teamMember) {
  return (
    <AboutCard
      key={teamMember.id}
      name={teamMember.name}
      image={teamMember.image}
      email={<a href={`mailto: ${teamMember.email}`}>{teamMember.email}</a>}
    />
  );
}

function AboutApp() {
  return (
    <Grid container spacing={1} justifyContent="center" marginLeft={1}>
      {teamMembers.map((person) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          direction="row"
          maxWidth="400"
          justifyContent="space-evenly"
          alignContent="center"
          // alignItems="center"
        >
          {createCard(person)}
        </Grid>
      ))}
    </Grid>
  );
}

export default AboutApp;
