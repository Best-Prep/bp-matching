import React, {useState, useEffect} from 'react'

//Utilities
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
//Material-UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {TextField} from '@material-ui/core';

//Custom Components
import PreferenceBarChart from '../atoms/preferenceBarChart/PreferenceBarChart'
import CareerDayStats from '../atoms/careerDayStats/CareerDayStats';
import CareerDayTable from '../atoms/careerDayTable/CareerDayTable';
import Header from '../organisms/header/header';
import StepInstructions from '../molecules/step_instructions/StepInstructions'

/* 
    Material-UI's dashboard example was used for reference, no need to reinvent the wheel
    https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/dashboard
    */

const UseStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      color: 'red',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    paper2: {
      padding: theme.spacing(2),
      minHeight:"80%"
    },
    fixedHeightPaper:{
      height: 240,
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    }
  }));
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1)
  var dd = String(tomorrow.getDate()).padStart(2, '0');
  var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = tomorrow.getFullYear();
  tomorrow = yyyy + '-' + mm + '-' + dd;
const CareerDayDashboard = () => {
    let rowsIn = []
    const [careerDayDate, setCareerDayDate] = useState("")
    const [data, setData] = useState({})
    const handleDateChange = (event) => {
      console.log("[FIRING DATE CHANGE]")
        axios.post('/api/careerDay/getDashboard', 
          {
            "careerDayDate": event.target.value
          },{headers: {
            'Content-Type': 'application/json',
          }}
        ).then(function (response) {
          let tempTotalStudents = 0;
          response.data.careerDay.schools.forEach(school =>{
            let studentCount = 0
            let regClassNum = response.data.classrooms.filter(regClass => {
                if (regClass.school.id === school.id && regClass.careerDayId === response.data.careerDay.id){
                    studentCount += regClass.students.length
                }
                return (regClass.school.id === school.id && regClass.careerDayId === response.data.careerDay.id)
            }).length
            rowsIn.push({
                "name": school.name,
                "registeringClasses": regClassNum,
                "students": studentCount
            })
            tempTotalStudents += studentCount;
            console.log(rowsIn)
          setData({careerDay:response.data.careerDay, regClasses: response.data.classrooms, rows: rowsIn, totalStudents: tempTotalStudents});
        })
      })}
    const classes = UseStyles();
    return (
    <div>
    <div style={{fontWeight: 'bold'}}>
        <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
    </div>
    <Container className={classes.container}>
            <StepInstructions 
              headerText={"Dashboard"}
              subText={"Select a date to view its dashboard"}/>
            <TextField
              id="date"
              label="Date of Career Day"
              type="date"
              defaultValue={tomorrow}
              onChange={handleDateChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
        </Container>
    {Object.keys(data).length === 0 ? (
      <>
      </>
    ):(
      <div>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={classes.fixedHeightPaper}>
                        <PreferenceBarChart registeringClasses={data.regClasses}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={classes.fixedHeightPaper}>
                        <CareerDayStats
                            totalRegistered={data.careerDay.schools.length}
                            totalStudents={data.totalStudents}
                            totalSubjects={data.careerDay.subjects.length}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.Paper}>
                        <CareerDayTable rows={data.rows}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        </div>
    )}
    </div>
    )
}

export default CareerDayDashboard
