import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from '../organisms/header/header';
import ExportButton from '../atoms/exportToCSV/exportbutton'
import axios from 'axios';
import Container from '@material-ui/core/Container';
import RosterExpansion from '../organisms/roster_expansion/RosterExpansion';
import { CSVLink, CSVDownload } from "react-csv";
import ReactExport from "react-data-export"; 

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

let exportData = []

const Roster = (props) => {
  const [expanded, setExpanded] = useState('panel1');
  const [state, setState] = useState()
  useEffect(() => {
    axios.post('/api/careerDay/getExportData',
      {
        "careerDayId": props.match.params.id
      },{headers: {
        'Content-Type': 'application/json',
      }}
    ).then(function (response) {
      let classroomsdata = [...response.data.classrooms]
      let careerdaydata = response.data.careerDay
      let studentSchedules = [];
      for (let i = 0; i < classroomsdata.length; i++) {
          let classroom = classroomsdata[i];
          for (let j = 0; j < classroom.students.length; j++) {
              let student = classroom.students[j];
              let studJSON = {};
              studJSON["Student"] = student.firstName + " " + student.lastName;
              studJSON["High School"] = classroom.school.name;
              for (let k = 0; k < student.schedule.length; k++) {
                  let period = "Period " + (k + 1);
                  studJSON[period] = student.schedule[k].name;
                  console.log("ASDFASDF" + student.schedule[k].name)
              }
              studentSchedules.push(studJSON);
          }
      }

          let sessRosters = [];

          // iterating through the subjects
          for (let i = 0; i < careerdaydata.subjects.length; i++) {
              let subjName = careerdaydata.subjects[i].name;
              let sessions = careerdaydata.sessions.filter(sess => sess.name === subjName);

              // iterating through the time periods within a subject
              for (let j = 0; j < sessions.length; j++) {        
                  let studArray = [];

                  let students = sessions[j].assignedStudents;

                  // iterating through the students within a subject at a time period 
                  for (let k = 0; k < students.length; k++) {
                      let studJSON = {};

                      let stud = students[k];
                      let sessName = subjName + " " + (j + 1);
                      studJSON["SessionName"] = sessName;
                      studJSON["Name"] = stud.firstName + " " + stud.lastName;
                      studJSON["School"] = stud.school;
                      studJSON["Present"] = "";

                      studArray.push(studJSON);
                  }
                sessRosters.push(studArray);
              }
          }
          console.log(sessRosters)
          setState({studentSchedules: studentSchedules, sessRosters: sessRosters, sessions: response.data.careerDay.sessions})
    })
  }, [props.match.params.id])

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

var dataSet2 = [
    {
        name: "Johnson",
        total: 25,
        remaining: 16
    },
    {
        name: "Josef",
        total: 25,
        remaining: 7
    }
];
  return (
    <div>
      <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
      <h1>Session Rosters</h1>
      <Container maxWidth="lg">
        
        {state && state.studentSchedules ?(
          <>
          <ExcelFile element={<ExportButton>E</ExportButton>}>
            <ExcelSheet data={state.studentSchedules} name="StudentSchedules">
              {Object.keys(state.studentSchedules[0]).map((item => {
                return(
                  <ExcelColumn label={item} value={item}/>
                )
              }))}
            </ExcelSheet>
            {state.sessRosters.map(((sessionRoster,index) => {
              console.log(sessionRoster)
              console.log(index)
              return(
                <ExcelSheet data={sessionRoster} name={sessionRoster[0].SessionName}>
                  <ExcelColumn label={sessionRoster[0].SessionName} value="Present"/>
                  <ExcelColumn label="Student" value="Name"/>
                  <ExcelColumn label="School" value="School"/>
                  <ExcelColumn label="Present" value="Present"/>
                </ExcelSheet>
              )
          }))}
          </ExcelFile>
          {/* this is the expansion panel */}
          {state.sessions.map(session => {
            return(
              <RosterExpansion session={session} expanded={expanded} handleChange={handleChange}/>
            )
          })}
          </>
        ):(
          <ExportButton>E</ExportButton>
        )}
      </Container>
    </div>
  )
}

export default Roster;