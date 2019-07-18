
import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';



const UseStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    button: {
        margin: theme.spacing(1),
      },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      height: 150,
      flexDirection: 'column',
    },
    fixedHeightPaper:{
    //   height: 200,
      padding: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
      },
    leftIcon: {
        marginRight: theme.spacing(1),
      },
    iconSmall: {
        fontSize: 20,
      }
  }));

 const homePage = () => {
    const classes = UseStyles();
     return (

        <div style ={{marginLeft: 300, marginRight:300, marginTop: 100}}>
        <Container maxWidth="lg" className={classes.container}>
            
            {/* Chart */}
      
                <Paper className={classes.fixedHeightPaper}>
                    <div style={{fontSize: 30}}><h1>BestPrep</h1></div>
                    <div> <form><p>Login: <input type="text"></input></p></form></div>
                    <div><Button variant="contained" color="primary" className={classes.button}>
                    Submit
                    <Icon className={classes.rightIcon}> <i class="material-icons">
                    arrow_right_alt
                    </i></Icon>
                    </Button></div>
             </Paper>
    
             </Container>
             </div>
         
     )
 }
 
 export default homePage
 
 