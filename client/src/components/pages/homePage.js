
import React from 'react'
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField'
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowRightAltRounded from '@material-ui/icons/ArrowRightAltRounded';

const imgUrl=require('./background-pic.jpg')
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

      marginLeft: 300,
      flexDirection: 'column',
    },
    fixedHeightPaper:{
      padding: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
        padding:'20%',
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
    },
  }));

 export default function homePage() {
    const classes = UseStyles();
     return (

        <div style = {{backgroundImage: "url(" +imgUrl +")", height: '100vh', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        {/* // <div style ={{marginLeft: 390, marginRight:390, marginTop: 100}}> */}
        <Container maxWidth="sm" className={classes.container}>
            
            {/* Chart */}
      
                <Paper maxWidth="sm" className={classes.fixedHeightPaper} style={{marginLeft: 15}}>
               
                    <img src={require('./bestpreplogotagline.png')} alt="bestPrep" style={{height: 180, width: 380, paddingLeft: 35, position: 'center'}}/>

{/*<div> <form><p>Login: <input type="text"></input></p></form></div> */}
                    <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="standard-name"
                        label="Login ID"
                        className={classes.textField}
                        margin="normal"
                    />
                    </form>
                    <div><Button variant="contained" color="primary" className={classes.button}>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to = "../import">Submit</Link>
                    <ArrowRightAltRounded className={classes.icon} />
                   
                 
                    </Button></div>
             </Paper>
    
             </Container>
            </div>
         
     );
 }
 
 
 