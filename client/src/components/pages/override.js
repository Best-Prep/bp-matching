import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../organisms/header/header';
import ClassroomCard from '../organisms/classroom_card/ClassroomCard';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import SearchBar from '../organisms/classroom_card/SearchBar';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {TextField} from '@material-ui/core';
const UseStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    rootGrid:{
      direction: "column",
      alignItems:"stretch",
      justify: "center"
    
    },
  }));

const Override = (props) => {
    const [searchField, setsearchField] = useState('')
    const [classroomData, setclassroomData] = useState([])
    const [careerDayId, setCareerDayId] = useState("")
    let dataCopy = JSON.parse(JSON.stringify(classroomData));

    const handleChange = (event) => {
      setsearchField(event.target.value)
    }

    const handleDateChange = (event) => {
      axios.post('/api/classrooms/getClassrooms', 
        {
          "careerDayDate": event.target.value
        },{headers: {
          'Content-Type': 'application/json',
        }}
      ).then(function (response) {
        setclassroomData(response.data.classrooms);
        setCareerDayId(response.data.careerDayId);
      })
    }
    

    const classes = UseStyles()
    return ( 
      <div>
        <div style={{fontWeight: 'bold'}}>
          <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
        </div>
        <h1>Select a Classroom</h1>

        <Container style={{marginBottom: 20}}>
          <TextField
              id="date"
              label="Date of Career Day"
              type="date"
              onChange={handleDateChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
          />
          <Button variant="contained" color="primary" className={classes.button} disabled={careerDayId === ""}><Link to={"/roster/" + careerDayId} style={{textDecoration: 'none', color:"inherit"}}>View Session Rosters</Link></Button>
          <SearchBar handleChange = {handleChange}/>
          {/* <input type="text" className="input" placeholder="Search..." />
          <ul>
          </ul> */}
        </Container>
        <div style={{marginBottom:70, width: '80%', margin:'auto'}}>
          <Grid container spacing={6} className={classes.rootGrid}> 
            {dataCopy.filter(e => e.school.name.toUpperCase().includes(searchField.toUpperCase())||  (e.teacher.firstName + e.teacher.lastName).toUpperCase().includes(searchField.toUpperCase()) ).map((item, index) => {
              return (
                <ClassroomCard classroom={item}/>
              )
            })}
          </Grid>
        </div>
      </div>  
    )
}

export default Override
