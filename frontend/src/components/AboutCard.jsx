import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


export default function MediaCard(props) {
  return (
    <Card sx={{ 
      maxWidth: 300,
      marginTop: 5,
      backgroundColor: "#F4F2F2"      
      }}>
      <CardMedia
        sx={{ height: 300 }}
        image={props.image}
        title="team member image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize={18}>
        {props.email}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}