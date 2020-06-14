import React from 'react';
import Login from './Login/Login';
import ConfigurationForm from './Login/ConfigurationForm';
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
          </Switch>
      </BrowserRouter>
      </div>
    )
  }
}

export default App
