import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route} from "react-router-dom";

import Header from './components/organisms/header/header';
import Import from './components/pages/import';
import Override from './components/pages/override';
import ViewAll  from './components/pages/viewAll';
import careerDayDashboard from './components/pages/careerDayDashboard';

//Example way to add a new route
//<Route path="/<path>" exact component={<component to render when on this route>} />

function App() {
  return (
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
  );
}

export default App;
