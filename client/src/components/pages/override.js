import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StudentCard from '../organisms/student_card/StudentCard';
import axios from 'axios';
import SearchBar from '../organisms/classroom_card/SearchBar';

let data = require('../../CareerDay.json') //TODO: Get rid of dummy data
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
        <h2>_______'s Class Schedule</h2>
        <h4>_______ High School</h4>
        <SearchBar handleChange = {handleChange}/>
        <div style={{marginTop:40}}>
        <Grid container spacing={3} className={classes.root}>
            <Grid container item direction="column" spacing={2} xs={12}>
           
                {classroomData.classrooms[0].classroom_students.filter(e => e.student_first.toUpperCase().includes(searchField.toUpperCase())).map((item,index) => (
                    <Grid item key={item.student_id}>
                        <StudentCard testVal={dataCopy.classrooms[0].classroom_students[0].student_first} studentIndex = {index} studentName={item.student_first + " " + item.student_last} schedule={item.schedule} handleChange={handleClassChange}/>
                    </Grid>
                ))}
            </Grid>
       </Grid>
       </div>
       </div>
       
    )
}

export default Override;