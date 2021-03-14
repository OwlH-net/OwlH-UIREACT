import React from 'react';
import Login from './Login/Login';
import {Switch, BrowserRouter, Route, browserHistory } from 'react-router-dom';
import ConfigurationForm from './Login/ConfigurationForm';
import Welcome from './Welcome/Welcome';
import Master from '../components/Master/components/index';
import Config from '../components/Config/components/index';
import Nodes from '../components/Nodes/components/index';
import Groups from '../components/Groups/components/index';
import OpenRules from '../components/OpenRules/components/index';
import ChangePassword from '../components/Shared/Components/ChangePassword';
import GroupDetails from './Groups/components/GroupDetails';
import DisplayFiles from '../components/Shared/DisplayFiles/index';
import Organizations from './Config/Organizations/Organizations';
import ManageNode from './Nodes/ManageNode/manageNode';

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
              <Route path="/FileContent" exact component={ DisplayFiles }/>
              <Route path="/Organizations" exact component={ Organizations }/>
              <Route path="/manageNode" exact component={ ManageNode }/>
            </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
