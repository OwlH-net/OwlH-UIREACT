import React from 'react';
import Login from './Login/Login'
import ConfigurationForm from './Login/ConfigurationForm'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import Configuration from './Configuration'


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
            <Route path="/" exact component={Login}/>
            <Route path="/ConfigurationForm" exact component={ConfigurationForm}/>
          </Switch>
        </BrowserRouter>
        {/* <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/configuration-form" exact component={ ConfigurationForm } />
        </Switch> */}
        {/* <Login /> */}
        {/* {!this.state.logged ? <Login /> : null}
        <hr />
        <Configuration /> */}
      </div>
    )
  }
}

export default App;