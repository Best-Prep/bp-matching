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
    const [subjects, setSubjects] = useState([{
        "name": "",
        "seats": ""   
    }])
    const [activeStep, setActiveStep] = useState(0)
    //Handles the change of the sheet link text field
    const handleChange = event => {
        setSheetLink(event.target.value);
    }
    
    //Handles the sumbission of the text link, this gets called when the submit button is clicked.
    const handleSubmit = (event) => {
        //TODO: add functionality to actually submit to the express server / mongo
        /*Axios is a promised based HTTP client for node, this makes a post request to the backend
         express server and provides the sheet link as part of the request*/
        axios.post('/api/spreadsheets/importSheet', {
            sheetLink: sheetLink,
          })
          /*This function is called after the request has received a response,
           it fires the alert announcing the success of the import */ 
          .then(function (response) {
            Swal.fire({
                type: 'success',
                title: 'Success!',
                text: 'The spreadsheet you have linked has been submitted:  ' + response.data.id,
                footer: 'Note: this is a demo, no upload has actually taken place',
                onClose: () => {
                    props.history.push('/Override')
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

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Step1
                        handleChange={handleChange}
                        sheetsLink={sheetLink}
                        handleSubmit={handleSubmit}
                        instructionHeader="Step 1"
                        instructions="Paste the link to the Career Day Google Sheet. Then click Submit."
                    />
                )
            case 1:
                return (
                        <Step2
                            subjects={subjects}
                            instructionHeader="Step 2"
                            instructions=
                                "Add the Subjects that will be present at this Career Day, then add the total number of seats at the career day for the subject"
                            handleChange={handleStep2Change}
                            addSubject={handleAddSubject}
                            removeSubject={handleRemoveSubject}
                        />
                ) ;
            case 2:
                return 'StepComponent1';
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
    const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    return (
        <div style={{fontWeight: 'bold'}}>
<<<<<<< HEAD
        <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
=======
        <Header linkTo='./' headName='BestPrep' style={{fontWeight: 'bold'}}/>
>>>>>>> b4a8e496823dc9296f90d703af98df57d1d3f229
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
