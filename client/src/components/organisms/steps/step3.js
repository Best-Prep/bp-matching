import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StepInstructions from '../../molecules/step_instructions/StepInstructions'
import Grid from '@material-ui/core/Grid';
import { Container, TextField } from '@material-ui/core';


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
                        <>
                            <Typography>{registeringClass.teacher.firstName + ' ' + registeringClass.teacher.lastName}</Typography>
                            <Typography variant="h6" component="h6">{registeringClass.school.name}</Typography>
                            <TextField
                                name="seats"
                                label="Seats"
                                className={classes.textField}
                                value={0}
                                onChange={props.handleChange}
                                margin=""
                            />
                        </>
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
                        <Typography className={classes.heading}>{subject.name}</Typography>
                        <Typography className={classes.secondaryHeading}>Total Seats: {subject.seats}</Typography>
                        <Typography className={classes.secondaryHeading}>Available Seats:</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {renderSchools(subject)}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        }) }
        </>
        
    )
}

export default Step3
