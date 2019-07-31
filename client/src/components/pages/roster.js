import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from '../organisms/header/header';
import ExportButton from '../atoms/exportToCSV/exportbutton'
import axios from 'axios';
import Container from '@material-ui/core/Container';
import RosterExpansion from '../organisms/roster_expansion/RosterExpansion';

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

  return (
    <div>
      <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
      <h1>Session Rosters</h1>
      <Container maxWidth="lg">
        <ExportButton>Export to CSV</ExportButton>
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