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
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({

  media: {
    height: 140
  }
});

const ClassroomCard = (props) => {
  
  const classes = useStyles();
  return (
   <Grid item xs={6} md={4} lg={4} xl={3}>
     <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {props.classroom.teacher.firstName + " " + props.classroom.teacher.lastName}
          </Typography>
          <Typography gutterBottom variant="h7" component="h3">
            {props.classroom.school.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Container>
        <Button><NavLink to={"/classOverride/" + props.classroom.id}   style={{ textDecoration: 'none' }}>View Class Schedule</NavLink></Button>
        </Container>

        {/* <Button size="small" color="primary" onClick={this.routeChange}>View Class Schedule</Button> */}
      </CardActions>
    </Card>
    </Grid>
  );
}
export default ClassroomCard