import React from 'react';
import Login from './Login/Login';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import ConfigurationForm from './Login/ConfigurationForm';
import Welcome from './Welcome/Welcome';
import Master from '../components/Master/components/index';
import Config from '../components/Config/components/index';
import Nodes from '../components/Nodes/components/index';
import Groups from '../components/Groups/components/index';
import OpenRules from '../components/OpenRules/components/index';
import ChangePassword from '../components/Shared/Components/ChangePassword';
import GroupDetails from './Groups/components/GroupDetails';

class App extends React.Component {
    constructor (props) {
        super();
        this.state = {
            logged: false,
        }         
    }

  render() {
    return (
      <div className="container">
      <BrowserRouter>
          <Switch>
            <Route path="/Login" exact component={ Login }/>
            <Route path="/ConfigurationForm" exact component={ ConfigurationForm }/>
            <Route path="/" exact component={ Welcome }/>
            <Route path="/Master" exact component={ Master }/>
            <Route path="/Config" exact component={ Config }/>
            <Route path="/Groups" exact component={ Groups }/>
            <Route path="/Nodes" exact component={ Nodes }/>
            <Route path="/OpenRules" exact component={ OpenRules }/>
            <Route path="/ChangePassword" exact component={ ChangePassword }/>
            <Route path="/GroupDetails" exact component={ GroupDetails }/>
          </Switch>
      </BrowserRouter>
      </div>
    )
  }
}

export default App
