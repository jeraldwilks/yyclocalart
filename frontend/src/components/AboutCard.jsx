import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

// const About = () => {
//   return (
//     <div>
//       <h1>This is Us!</h1>
//     </div>
//   );
// };
// export default About;
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  return (
    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 6, xl: 2 }}>
    <Card sx={{ 
      minWidth: 275, 
      // backgroundImage: "url('../images/IMG_5432.jpeg')", 
      // backgroundRepeat: "no-repeat"
      // height: "300px,
      // width: "400x"
  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Team Member Name:
        </Typography>
        <Typography variant="h6" component="div">
          {props.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          email:
        </Typography>
        <Typography variant="body2">
          {props.email}
          <br />
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    </Grid>
  );
}

