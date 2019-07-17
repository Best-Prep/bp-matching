import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StudentCard from '../organisms/student_card/StudentCard';
import axios from 'axios';
import SearchBar from '../organisms/classroom_card/SearchBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

let data = require('../../careerDay.json') 
let registeringClasses = require('../../registeringClasses.json') 


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));



  //TODO: Add an actual list of potential classes to choose from / implement functionality to determine if class is full
  
const Override = (props) => {
    let testid = "3sn4g4kkjy60048p"
    const handleClick = () => {
    } 
    registeringClasses = registeringClasses.filter(registeringClass => registeringClass.careerDayId === data.id)
    const [searchField, setsearchField] = useState('')
    const [classroomData, setclassroomData] = useState(registeringClasses)
    const dataCopy = JSON.parse(JSON.stringify(classroomData));
    const handleClassChange = (studentIndex,classIndex,event) => {
        dataCopy[classIndex].students[studentIndex].schedule[classIndex] = event.target.value
        setclassroomData(dataCopy) //Sets the state so that the page rerenders with the newly selected item
    }


    const handleChange = (event) => {
      setsearchField(event.target.value)
    }

    const classes = useStyles();
    let filteredClasses = classroomData.filter(e => e.id === testid)
    return(
        
       <div>
        <h2>John Doe's Class Schedule</h2>
        {/* <h4>Wayzata High School</h4> */}
        {/* <Container maxWidth="lg">
        <Typography component="div" style={{ height: '100vh'}} > */}
    
        <div class="searchBar">
          <SearchBar handleChange = {handleChange}/>
        </div>
        {filteredClasses[0].id}
        <div style={{marginTop:20}}>
        <Grid container spacing={3} className={classes.root}>
            <Grid container item direction="column" spacing={2} xs={12}>
                {classroomData.filter(classRoom => classRoom.id === testid)[0].students.filter(e => e.firstName.toUpperCase().includes(searchField.toUpperCase())).map((item,index) => (
                    <Grid item key={item.id}>
                        <StudentCard studentIndex = {index} studentName={item.lastName + " " + item.firstName} schedule={item.schedule} handleChange={handleClassChange}/>
                    </Grid>
                ))}
            </Grid>
       </Grid>
       </div>
       {/* </Typography>
       </Container> */}
       </div>
    
  
      
       
    )
}

export default Override;