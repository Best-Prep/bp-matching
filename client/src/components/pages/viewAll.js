import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClassroomCard from '../organisms/classroom_card/ClassroomCard';

let data = require('../../CareerDay.json') 

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

const ViewAll = (props) => {
    const [classroomData, setclassroomData] = useState(data)
    return (
            <ClassroomCard teacherName={data.teacher_first + " " + data.teacher_last} />
            
           
    )
}

export default ViewAll
