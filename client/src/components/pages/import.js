import React, { useState } from 'react'

//Utilities
import Swal from 'sweetalert2'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

//Components -- Material-UI
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//Custom Components
import SheetsForm from '../organisms/sheets_link_form/sheets_link_form'
import Step2 from '../organisms/steps/step2/step2'

const UseStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        direction:'column',
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px gray',
    },
    instructions: {

    }
}))

const Import = (props) => {
    const [sheetLink, setSheetLink] = useState("")
    const [subjects, setSubjects] = useState([{
        "name": "",
        "seats": 0   
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
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <SheetsForm handleChange={handleChange} sheetsLink={sheetLink} handleSubmit={handleSubmit}/>;
            case 1:
                return (
                    <div>
                        <Step2 headerText="Step 2" subText="Instructions go here" />
                    </div>

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
        <div style={{width: '90%', margin: 'auto', paddingTop: '5%'}}>
            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12}>
                    <div style={{height: '70vh'}}>
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
                            <div>
                                <Typography className={classes.instructions}>
                                    {getStepContent(activeStep)}
                                </Typography>
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
                            </div>
                        )}
                    </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Import
