import React from 'react';
import Login from './Login/Login';
import ConfigurationForm from './Login/ConfigurationForm';
import Welcome from './Welcome/Welcome';
import Master from '../components/Master/components/index';
import Config from '../components/Config/components/index';
import Nodes from '../components/Nodes/components/index';
import Groups from '../components/Groups/components/index';
import OpenRules from '../components/OpenRules/components/index';

// import Config from '../components/Shared/Components/Menu/Config';
// import Groups from '../components/Shared/Components/Menu/Groups';
// import Nodes from '../components/Shared/Components/Menu/Nodes';
// import OpenRules from '../components/Shared/Components/Menu/Master';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

class App extends React.Component {
    constructor (props) {
        super();
        this.state = {
            logged: false,
        }

         
    }



  render() {
    return (
      <div>
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={ Login }/>
            <Route path="/ConfigurationForm" exact component={ ConfigurationForm }/>
            <Route path="/Welcome" exact component={ Welcome }/>
            <Route path="/Master" exact component={ Master }/>
            <Route path="/Config" exact component={ Config }/>
            <Route path="/Groups" exact component={ Groups }/>
            <Route path="/Nodes" exact component={ Nodes }/>
            <Route path="/OpenRules" exact component={ OpenRules }/>
          </Switch>
      </BrowserRouter>
      </div>
    )
  }
}

export default App
