
import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';

<<<<<<< HEAD
=======



>>>>>>> 3a5ec8bc3fa9eaa74b0f89b381ce411722fb13ff
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

 export default function homePage() {
    const classes = UseStyles();
     return (

        <div style ={{marginLeft: 390, marginRight:390, marginTop: 100}}>
        <Container maxWidth="lg" className={classes.container}>
            
            {/* Chart */}
      
                <Paper className={classes.fixedHeightPaper}>
               
                    <img src={require('./bestprepLogo.png')} alt="bestPrep" style={{height: 180, width: 380, paddingRight: 50}}/>

                    <div> <form><p>Login: <input type="text"></input></p></form></div>
                    <Button variant="contained" color="primary" className={classes.button}>
                    Get Started
                <Icon className={classes.rightIcon} />
            </Button>
             </Paper>
    
             </Container>
             </div>
         
     );
 }
 
 
 