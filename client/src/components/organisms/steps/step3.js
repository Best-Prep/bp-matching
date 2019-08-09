import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StepInstructions from '../../molecules/step_instructions/StepInstructions'
import Grid from '@material-ui/core/Grid';
import {TextField } from '@material-ui/core';


const UseStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
  }));

const Step3 = (props) => {
    const classes = UseStyles();
    const [expanded, setExpanded] = useState(false);

    //This handles the expansion panels opening and closing
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    //This renders the data (schools) in each expansion panel
    const renderSchools = (subject) => {
        return(
            <>
          
                {props.registeringClasses.map(registeringClass => {
              
                    return(
                        <Grid item xs={3}>
                            <Typography>{registeringClass.teacher.firstName + ' ' + registeringClass.teacher.lastName}</Typography>
                            <Typography variant="h6" component="h6">{registeringClass.school.name}</Typography>
                        
                            <TextField
                                name="seats"
                                label="Seats"
                                type="number"
                                className={classes.textField}
                                value={registeringClass.sessions[registeringClass.sessions.findIndex(session => session.name === subject.name)].seats}
                                onChange={e => props.handleChange(e,subject.id,registeringClass.id)}
                            />
                            
                        </Grid>
                   
                    )
                })}
            </>

        )
    }
    return (
        <>
        <StepInstructions headerText={props.instructionHeader} subText={props.instructions}/>
        {props.careerDay.subjects.map((subject, index) => {
            //This renders an extension panel per subject.
            return(
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded === ('panel' + subject.id)} onChange={handleChange('panel'+subject.id)} className={classes.root}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel"+ subject.id + "bh-content"}
                        id={"panel" + subject.id + "bh-header"}
                    >
                        <Typography className={classes.heading} style={{fontWeight: 'bold'}}>{subject.name}</Typography>
                        <Typography className={classes.secondaryHeading}>Total Seats:&nbsp;{subject.seats} </Typography>
                        {/* <Typography className={classes.secondaryHeading}>&nbsp; &nbsp; Available Seats:&nbsp; </Typography> */}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={6}>
                            {renderSchools(subject)}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        }) }
        </>

    )

}

export default Step3
