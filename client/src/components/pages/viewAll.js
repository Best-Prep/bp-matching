import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../organisms/header/header';
import ClassroomCard from '../organisms/classroom_card/ClassroomCard';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import SearchBar from '../organisms/classroom_card/SearchBar';

 
let data = require('../../careerDay.json') 
let registeringClasses = require('../../registeringClasses.json') 
registeringClasses = registeringClasses.filter(registeringClass => registeringClass.careerDayId === data.id)
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

const ViewAll = (props) => {
    
const [searchField, setsearchField] = useState('')
const [classroomData, setclassroomData] = useState(registeringClasses)

let dataCopy = JSON.parse(JSON.stringify(classroomData));

const handleChange = (event) => {
  setsearchField(event.target.value)
}
    return (
        <div>

<div style={{fontWeight: 'bold'}}>
      <Header linkTo='./homePage' headName='BestPrep' style={{fontWeight: 'bold'}}/>
      </div>
          <h1>Select a Classroom</h1>

          <div class="container">
            <SearchBar handleChange = {handleChange}/>
            {/* <input type="text" className="input" placeholder="Search..." />
              <ul>
              </ul> */}
          </div>
          <div style={{marginBottom:70}}>
          <Grid container alignItems="left"> 
            {dataCopy.filter(e => e.school.name.toUpperCase().includes(searchField.toUpperCase())||  (e.teacher.firstName + e.teacher.lastName).toUpperCase().includes(searchField.toUpperCase()) ).map((item, index) => {
              return (
                <ClassroomCard teacherName={item.teacher.firstName + " " + item.teacher.lastName} schoolName={item.school.name}>xs=3</ClassroomCard>
              )
            })}
           </Grid>
           </div>
        </div>
        
            
    )
}

export default ViewAll
