import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Team Member J
        </Typography>
        <Typography variant="h5" component="div">
          Jerald Wilks
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          email:
        </Typography>
        <Typography variant="body2">
          sdlfkjsdfl@hogklsg.com
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
