import React from "react";
import { withRouter } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import { Container } from "@material-ui/core";


const useStyles = makeStyles({
  card: {
<<<<<<< HEAD
    maxWidth: '80%',
    maxHeight: '40%',
=======
    maxWidth: '100%'
>>>>>>> b4a8e496823dc9296f90d703af98df57d1d3f229
  },
  media: {
    height: 140
  }
});

const ClassroomCard = (props) => {

  const classes = useStyles();

  return (
   <Grid item xs={3}>
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
          <Container>
            <Button><NavLink to="/Override" style={{ textDecoration: 'none' }}>View Class Schedule</NavLink></Button>
            {/* <Button size="small" color="primary" onClick={this.routeChange}>View Class Schedule</Button> */}
          </Container>
          </CardActions>
        </Card>
      </Grid>
  );
}
export default ClassroomCard