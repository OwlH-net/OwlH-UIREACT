import React from 'react';
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Input from './Input'
import { newMaster } from '../../store/owlh/actions';
import { connect } from 'react-redux';


const NewMaster = (props) => {

  const getFormData = () => {
    const master = {
      name:document.getElementById("name").value,
      ip:document.getElementById("ip").value,
      port:document.getElementById("port").value,
      desc:document.getElementById("desc").value,
      active:false
    }    
    // return master
    props.addMaster(master)
  }

  return (
    <div>
        <h4>New Master</h4>
        <div style={{border: '2px solid'}}>
            <Input id="name" caption="Master Name" inputType="text"/>
            <Input id="ip" caption="Master IP" inputType="text"/>
            <Input id="port" caption="Master Port" inputType="text"/>
            <Input id="desc" caption="Master Description" inputType="text"/>
            <div className="AlignRight input-group">
                {/* <NavLink to="/" type="button" className="m-3 p-2 w-25 btn btn-primary" onClick={getFormData()}><h5>Add</h5></NavLink> */}
                <button type="button" className="m-3 p-2 w-25 btn btn-primary" onClick={getFormData}><h5>Add</h5></button>
            </div>

        </div>
    </div>
  )
}

// export default NewMaster;
const mapDispatchToProps = dispatch => {
  console.log("dispatch to props")
  const addNewMaster = (master) => {return newMaster(master)}
  return {
    addMaster: (master) => dispatch(addNewMaster(master))
  }
}

const withProps = connect(null, mapDispatchToProps);
export default withProps(NewMaster)