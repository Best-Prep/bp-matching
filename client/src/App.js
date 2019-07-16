import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route} from "react-router-dom";

import Header from './components/organisms/header/header';
import Import from './components/pages/import';
import Override from './components/pages/override';
import ViewAll  from './components/pages/viewAll';
import careerDayDashboard from './components/pages/careerDayDashboard';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';


//Example way to add a new route
//<Route path="/<path>" exact component={<component to render when on this route>} />
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0067ac'
    },
    secondary: {
      main: '#f5dff5'
    }
  },
  overrides:{
    MuiStepIcon:{
      root: {
        '&$completed':{
          color: '#efa937'
        },
        '&$active': {
          color: '#0067ac'
        }
    
      }
    }
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App"> 
          <div style={{fontWeight: 'bold'}}>
            <Header linkTo='/' headName='BestPrep' style={{fontWeight: 'bold'}}/>
          </div>
          <Route path="/import" exact component={Import} />
          <Route path="/Override" exact component={Override} />
          <Route path="/ViewAll" exact component={ViewAll} />
          <Route path="/dashboard" exact component={careerDayDashboard} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
