import React from 'react'

//Utilities
import { makeStyles } from '@material-ui/core/styles';

//Material-UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


//Custom Components
import PreferenceBarChart from '../atoms/preferenceBarChart/PreferenceBarChart'
import CareerDayStats from '../atoms/careerDayStats/CareerDayStats';
import CareerDayTable from '../atoms/careerDayTable/CareerDayTable';
import Header from '../organisms/header/header';

let careerDay = require('../../careerDay.json')
let regClasses = require('../../registeringClasses.json')
/* 
    Material-UI's dashboard example was used for reference, no need to reinvent the wheel
    https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/dashboard
    */
let rows = []
let totalStudents = 0;
const prepData = () =>{
    
    careerDay.schools.forEach(school =>{
        let studentCount = 0
        let regClassNum = regClasses.filter(regClass => {
            if (regClass.school.id === school.id && regClass.careerDayId === careerDay.id){
                studentCount += regClass.students.length
            }
            return (regClass.school.id === school.id && regClass.careerDayId === careerDay.id)
        }).length
        rows.push({
            "name": school.name,
            "registeringClasses": regClassNum,
            "students": studentCount
        })
        totalStudents += studentCount;
    })
    return rows;
}
const UseStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeightPaper:{
      height: 240,
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    }
  }));

const careerDayDashboard = () => {
    prepData()
    const classes = UseStyles();
    return (
    <div>
    <div style={{fontWeight: 'bold'}}>
      <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
      </div>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={classes.fixedHeightPaper}>
                        <PreferenceBarChart/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={classes.fixedHeightPaper}>
                        <CareerDayStats
                            totalRegistered={careerDay.schools.length}
                            totalStudents={totalStudents}
                            totalSubjects={careerDay.subjects.length}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.Paper}>
                        <CareerDayTable rows={rows}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        </div>
    )
}

export default careerDayDashboard
