import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import RosterTable from '../molecules/rosterTable/roster_table';
import Header from '../organisms/header/header';
import SearchBar from '../organisms/classroom_card/SearchBar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExportButton from '../atoms/exportToCSV/exportbutton'



const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

    return (
        <div>
        <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
        <h1>Class Roster </h1>
        <Container maxWidth="lg">
        <ExportButton>Export to CSV</ExportButton>
        {/* this is the expansion panel */}
      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Finance Period 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Container maxWidth="lg">
        <SearchBar handleChange = {handleChange}/>
          <Typography>
            <RosterTable></RosterTable>
          </Typography>
        </Container>
        </ExpansionPanelDetails>
        </ExpansionPanel>
        </Container>
        
        </div>
    )
}