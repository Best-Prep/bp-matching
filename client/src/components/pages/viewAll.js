import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClassroomCard from '../organisms/classroom_card/ClassroomCard';
import Typography from "@material-ui/core/Typography";

let data = require('../../CareerDay.json') 

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

const ViewAll = (props) => {
    const [classroomData, setclassroomData] = useState(data)
    return (
        <div>
          <h1>Select a Classroom</h1>
            <ClassroomCard teacherName={data.teacher_first + " " + data.teacher_last} schoolName={data.classRoom_id} />
            <ClassroomCard teacherName={data.teacher_first + " " + data.teacher_last} schoolName={data.classRoom_id} />
            <ClassroomCard teacherName={data.teacher_first + " " + data.teacher_last} schoolName={data.classRoom_id} />
            <ClassroomCard teacherName={data.teacher_first + " " + data.teacher_last} schoolName={data.classRoom_id} />
        </div>
    )
}

export default ViewAll
