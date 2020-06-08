import React from 'react';
import Login from './Login/Login'
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
        {!this.state.logged ? <Login /> : null}
        <hr />
        <Configuration />
      </div>
    )
  }
}

export default App;