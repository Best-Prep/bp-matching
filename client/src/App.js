import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route} from "react-router-dom";

import Header from './components/organisms/header/header';
import Import from './components/pages/import';
import Override from './components/pages/override';
import ViewAll  from './components/pages/viewAll';

//<Route path="/studentEntry" exact component={} />
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
        {/* <TestComponent number="this.state.number"/>
        <TestComponent number={6}/> */}
      </div>
    </Router>
  );
}

export default App;
