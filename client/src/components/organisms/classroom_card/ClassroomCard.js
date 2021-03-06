import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Dropdown from '../../atoms/Dropdown/Dropdown'
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const ClassroomCard = (props) => {

  const classes = useStyles();

  return (
   <div style={{paddingLeft:30, marginTop:50}}>
          
     <Grid
     container
     direction="column"
     justify="space-between"
     alignItems="center"
     >
   
   <Grid item>
     <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {props.teacherName}
          </Typography>
          <Typography gutterBottom variant="h7" component="h3">
            {props.schoolName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View Class Schedule
        </Button>
      </CardActions>
    </Card>
    </Grid>
    </Grid>
    </div>
  );
}
export default ClassroomCard
