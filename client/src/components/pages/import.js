import React, { useState } from 'react'

//Utilities
import Swal from 'sweetalert2'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/styles';
//Components -- Material-UI
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../organisms/header/header';
//Custom Components
import Step1 from '../organisms/steps/step1'
import Step2 from '../organisms/steps/step2'
import Step3 from '../organisms/steps/step3';

//Note: These handlechange functions could probably be optimized and condensed, but I do not know react well enough to do this right now

const UseStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        direction:'column',
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px gray',
    },
    instructions: {

    },
    container: {
        paddingBottom: '3%',
        paddingTop: '3%'
    }
}))

const Import = (props) => {
    const [sheetLink, setSheetLink] = useState("")
    const [careerDay, setCareerDay] = useState()
    const [registeringClasses, setRegisteringClasses] = useState()
    const [schools, setSchools] = useState();
    const [periods, setPeriods] = useState(0);
    const [subjects, setSubjects] = useState([{
        "name": "",
        "seats": ""   
    }])
    const [activeStep, setActiveStep] = useState(0)
    //Handles the change of the sheet link text field
    const handleChange = event => {
        if(event.target.id === "period"){
            setPeriods(event.target.value)
        }else{
            setSheetLink(event.target.value);
        }
    }
    
    //Handles the sumbission of the text link, this gets called when the submit button is clicked.
    const handleSubmit = (date) => {
        //TODO: add functionality to actually submit to the express server / mongo
        /*Axios is a promised based HTTP client for node, this makes a post request to the backend
         express server and provides the sheet link as part of the request*/
        Swal.fire({
            title: 'Loading',
            text: "Contacting the server to import your sheet",
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            footer: 'Please be patient, this could take up to a minute'
        })
        axios.post('api/import/getSheetData', {
            sheetLink: sheetLink,
            numPeriods: periods,
            careerDayDate: date
          },{headers: {
            'Content-Type': 'application/json',
        }})
          /*This function is called after the request has received a response,
           it fires the alert announcing the success of the import */ 
          .then(function (response) {
            setCareerDay(response.data.careerDay)
            setRegisteringClasses(response.data.registeringClasses)
            setSchools(response.data.schools)
            setSubjects(response.data.careerDay.subjects)
            Swal.fire({
                type: 'success',
                title: 'Success!',
                text: response.data.message,
                footer: 'Note: This has only imported the data from the sheet, none of this data will be saved until you complete all of the import steps',
                onClose: () => {
                    handleNext()
                }
            })
          })
          //This catches the potential error that the request could encounter
          .catch(function (error) {
            console.log(error);
          });
    }
    //This method takes in the step number, and returns the JSX content for that step
    const handleStep2Change = (event, index) => {
        let subjectsCopy = [...subjects]
        subjectsCopy[index][event.target.name] = event.target.value
        setSubjects(subjectsCopy)
    }

    //Handles the addition of a new subject, this is used in Step2
    const handleAddSubject = (event) => {
        event.preventDefault()
        let subjectsCopy = [...subjects]
        subjectsCopy.push({"name": "", "seats":""})
        setSubjects(subjectsCopy)
    }

    const handleRemoveSubject = (event,index) => {
        let subjectsCopy = [...subjects]
        subjectsCopy.splice(index,1)
        setSubjects(subjectsCopy)
    }
    const handleStep3 = (event, subjectId, classRoomId) => {
        let classroomCopy = [...registeringClasses];
        let careerDayCopy = {...careerDay}
        let classIndex = classroomCopy.findIndex(registeringClass => registeringClass.id === classRoomId)
        let sessionsCopy = classroomCopy[classIndex].sessions
        let sessionIndex = sessionsCopy.findIndex(session => session.id === subjectId)
        classroomCopy[classIndex].sessions[sessionIndex].seats = event.target.value
        careerDayCopy.sessions[sessionIndex].seats = event.target.value
        console.log(careerDayCopy.sessions[sessionIndex].seats)
        setCareerDay(careerDayCopy)
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Step1
                        handleChange={handleChange}
                        sheetsLink={sheetLink}
                        handleSubmit={handleSubmit}
                        instructionHeader="Step 1"
                        instructions="Choose the date that the Career Day will take place. Paste the link to the Google-Sheet where the form responses are stored. Then input the number of periods at this Career Day."
                    />
                )
            case 1:
                return (
                        <Step2
                            subjects={subjects}
                            instructionHeader="Step 2"
                            instructions=
                                "Add the names of the career breakout sessions that will be present at this Career Day, then add the total number of seats at the Career Day for the session"
                            handleChange={handleStep2Change}
                            addSubject={handleAddSubject}
                            removeSubject={handleRemoveSubject}
                        />
                ) ;
            case 2:
                let registeringClasses1 = require('../../registeringClasses.json')
                let careerDay1 = require('../../careerDay.json')
                return (
                    <Step3 
                        careerDay={careerDay} 
                        registeringClasses={registeringClasses}
                        instructionHeader="Step 3"
                        instructions="Expand each session below, then enter the number of seats you would like to give to each registering classroom"
                    />
                );
            default:
                return 'Error, unknown step'
        }
    }
    //Handles going to the ext step
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
    //Handles the user going back a step
    const handleBack = (params) => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }
    
    //FIXME: Could be removed but we might want a reset button later
    const handleReset = (params) => {
        setActiveStep(0)
    }
    //TODO: fix grid
    const classes = UseStyles();
    const steps = ['Add link to spreadsheet', 'Add Subjects and Seats', 'Assign Seats to Classrooms', 'Finish'];
    return (
        <div style={{fontWeight: 'bold'}}>
        <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
        <Container className={classes.container}>
            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12}>
                    <div style={{minHeight: '70vh'}}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                    <div>
                        {activeStep === steps.length - 1? (
                            <div>
                                {careerDay.date}
                                <Typography className={classes.instructions}>
                                    You have completed every step! Click submit to complete the import of your Spreadsheet.
                                </Typography>
                                <Button 
                                    disabled={activeStep === 0} 
                                    onClick={handleBack} 
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                                <Button onClick={handleSubmit} className={classes.submitButton}>
                                    Submit
                                </Button>
                            </div>
                        ) : (
                            <Container>
                                {getStepContent(activeStep)}
                                <div>
                                    <Button 
                                        disabled={activeStep === 0} 
                                        onClick={handleBack} 
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </Container>
                        )}
                    </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
        </div>
    )
}

export default withTheme(Import);
