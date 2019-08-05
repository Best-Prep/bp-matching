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
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    axios.post('/api/careerDay/getSessions',
      {
        "careerDayId": props.match.params.id
      },{headers: {
        'Content-Type': 'application/json',
      }}
    ).then(function (response) {
      
      setSessions(response.data.sessions)
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
        <ExportButton>
          E
        </ExportButton>
        <ExcelFile element={<button>Download Data</button>}>
            <ExcelSheet data={dataSet1} name="Employees">
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Wallet Money" value="amount"/>
                <ExcelColumn label="Gender" value="sex"/>
                <ExcelColumn label="Marital Status"
                              value={(col) => col.is_married ? "Married" : "Single"}/>
            </ExcelSheet>
            <ExcelSheet data={dataSet2} name="Leaves">
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Total Leaves" value="total"/>
                <ExcelColumn label="Remaining Leaves" value="remaining"/>
            </ExcelSheet>
        </ExcelFile>
        {/* this is the expansion panel */}
        {sessions.map(session => {
          return(
            <RosterExpansion session={session} expanded={expanded} handleChange={handleChange}/>
          )
        })}
      </Container>
    </div>
  )
}

export default Roster;