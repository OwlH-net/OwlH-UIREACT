import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Input from './Input'
import { newMaster } from '../../store/owlh/actions';
import { connect } from 'react-redux';


const NewMaster = (props) => {

  const [master, setMaster] = useState({})

  useEffect(() => {
    console.log('Master modified')

    if (Object.entries(props.editMaster).length === 0) { return }

    console.log('will modify master')
    setMaster({
      // ...props.editMaster[0]
      name: props.editMaster[0].name,
      desc: props.editMaster[0].desc,
      ip: props.editMaster[0].ip,
      port: props.editMaster[0].port,
      active: props.editMaster[0].active
    })
  }, [props.editMaster]);

  const getFormData = () => {
    props.addMaster(master)
    setMaster({
      name: "",
      desc: "",
      port: "",
      ip: "",
      active: false
    })
  };

  const handleChange = (e) => {
    setMaster({
      ...master,
      [event.target.name]: event.target.value
    })
  };

  return (
    <div>
        <h4>New Master {typeof master.name !== 'undefined' && master.name != ''? `- edit master - ${master.name}`:''}</h4>
        <div style={{border: '2px solid'}}>
            <Input id="name" name="name" caption="Master Name" inputType="text" value={master.name|| ''} onChange={handleChange}/>
            <Input id="ip" name="ip" caption="Master IP" inputType="text" value={master.ip|| ''} onChange={handleChange}/>
            <Input id="port" name="port" caption="Master Port" inputType="text" value={master.port|| ''} onChange={handleChange}/>
            <Input id="desc" name="desc" caption="Master Description" inputType="text" value={master.desc|| ''} onChange={handleChange}/>
            <div className="AlignRight input-group">
                {/* <NavLink to="/" type="button" className="m-3 p-2 w-25 btn btn-primary" onClick={getFormData()}><h5>Add</h5></NavLink> */}
                <button type="button" className="m-3 p-2 w-25 btn btn-primary" onClick={getFormData}><h5>Add</h5></button>
            </div>

        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    console.log("state on edit master form")
    console.log(state.login.currentMaster)
    console.log( Object.entries(state.login.currentMaster).length === 0 ? "nulo": state.login.currentMaster[0].name)
    return {
        editMaster: state.login.currentMaster
    }
}

// export default NewMaster;
const mapDispatchToProps = dispatch => {
  console.log("dispatch to props")
  const addNewMaster = (master) => {return newMaster(master)}
  return {
    addMaster: (master) => dispatch(addNewMaster(master))
  }
}

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(NewMaster)
