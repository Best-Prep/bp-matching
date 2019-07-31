import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from '../organisms/header/header';
import StudentCard from '../organisms/student_card/StudentCard';
import axios from 'axios';
import SearchBar from '../organisms/classroom_card/SearchBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

//TODO: Get rid of dummy data
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));



  //TODO: Add an actual list of potential classes to choose from / implement functionality to determine if class is full
  
const ClassOverride = (props) => {
    const [searchField, setsearchField] = useState('')
    const [students, setStudents] = useState([])
    const [info, setInfo] = useState({teacherName: "", school: "" })
    useEffect(() => {
      axios.post('/api/classrooms/getStudents',
        {
          "classId": props.match.params.id
        },{headers: {
          'Content-Type': 'application/json',
        }}
      ).then(function (response) {
        setStudents(response.data.students);
        setInfo({teacherName: response.data.teacherName, school: response.data.school})
      })
    }, [props.match.params.id])

    const dataCopy = [...students]
    const handleClassChange = (studentIndex,classIndex,event) => {
        dataCopy.classroom_students[studentIndex].schedule[classIndex] = event.target.value
        setStudents(dataCopy) //Sets the state so that the page rerenders with the newly selected item
    }

    const handleChange = (event) => {
      setsearchField(event.target.value)
    }

    const classes = useStyles();

    return( 
      <div>
      <div style={{fontWeight: 'bold'}}>
        <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
      </div>
        <h2>{info.teacherName + "'s"} Class Schedule</h2>
        <h3>{info.school}</h3>
        {/* <h4>Wayzata High School</h4> */}
        {/* <Container maxWidth="lg">
        <Typography component="div" style={{ height: '100vh'}} > */}
        <div class="searchBar">
          <SearchBar handleChange = {handleChange}/>
        </div>
        <div style={{marginTop:20}}>
        <Grid container spacing={3} className={classes.root}>
            <Grid container item direction="column" spacing={2} xs={12}>
                {students.filter(e => e.firstName.toUpperCase().includes(searchField.toUpperCase())).map((item,index) => (
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

export default ClassOverride;