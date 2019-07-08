import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClassroomCard from '../organisms/classroom_card/ClassroomCard';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

let data = require('../../CareerDay.json')  

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

const ViewAll = (props) => {
    
const [classroomData, setclassroomData] = useState(data)
const dataCopy = JSON.parse(JSON.stringify(classroomData));
    return (
        <div>
          <h1>Select a Classroom</h1>

          <div>
            <input type="text" className="input" placeholder="Search..." />
              <ul>
              </ul>
          </div>
          <div style={{marginBottom:70}}>
          <Grid container alignItems="left"> 
            {dataCopy.classrooms.map((item, index) => {
              return (
               
                <ClassroomCard teacherName={item.teacher_first + " " + item.teacher_last} schoolName={item.school}>xs=3</ClassroomCard>
                
              )
            })}
           </Grid>
           </div>
        </div>
        
            
    )
}

export default ViewAll
