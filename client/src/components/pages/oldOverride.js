import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from '../organisms/header/header';
import StudentCard from '../organisms/student_card/StudentCard';
import axios from 'axios';
import SearchBar from '../organisms/classroom_card/SearchBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

let data = require('../../careerDay.json') 
let ClassroomData = require('../../registeringClasses.json')
//TODO: Get rid of dummy data
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));



  //TODO: Add an actual list of potential classes to choose from / implement functionality to determine if class is full
  
const Override = (props) => {
    const handleClick = () => {
        axios.post('/user', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    } 
    const [searchField, setsearchField] = useState('')
    const [classroomData, setclassroomData] = useState(data)
    const dataCopy = JSON.parse(JSON.stringify(classroomData));
    const handleClassChange = (studentIndex,classIndex,event) => {
        dataCopy.classroom_students[studentIndex].schedule[classIndex] = event.target.value
        setclassroomData(dataCopy) //Sets the state so that the page rerenders with the newly selected item
    }


    const handleChange = (event) => {
      setsearchField(event.target.value)
    }

    const classes = useStyles();

    return(

      
        
       <div>

      <div style={{fontWeight: 'bold'}}>
      <Header linkTo='./' headName='BestPrep' style={{fontWeight: 'bold'}}/>
      </div>
        <h2>John Doe's Class Schedule</h2>
        {/* <h4>Wayzata High School</h4> */}
        {/* <Container maxWidth="lg">
        <Typography component="div" style={{ height: '100vh'}} > */}
    
        <div class="searchBar">
          <SearchBar handleChange = {handleChange}/>
        </div>
        <div style={{marginTop:20}}>
        <Grid container spacing={3} className={classes.root}>
            <Grid container item direction="column" spacing={2} xs={12}>
                {ClassroomData[0.].students.filter(e => e.firstName.toUpperCase().includes(searchField.toUpperCase())).map((item,index) => (
                    <Grid item key={item.id}>
                        <StudentCard studentIndex = {index} studentName={item.firstName + " " + item.lastName} schedule={item.schedule} handleChange={handleClassChange}/>
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