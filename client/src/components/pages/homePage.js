
import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField'





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
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    }
  }));

 const homePage = () => {
    const classes = UseStyles();
     return (

        <div style ={{marginLeft: 390, marginRight:390, marginTop: 100}}>
        <Container maxWidth="lg" className={classes.container}>
            
            {/* Chart */}
      
                <Paper className={classes.fixedHeightPaper}>
               
                    <img src={require('./bestprepLogo.png')} alt="bestPrep" style={{height: 180, width: 380, paddingRight: 50}}/>
{/* 
                    <div> <form><p>Login: <input type="text"></input></p></form></div> */}
                    <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="standard-name"
                        label="Name"
                        className={classes.textField}
                        margin="normal"
                    />
                    </form>
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
 
 