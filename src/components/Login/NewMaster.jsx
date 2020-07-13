import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Input from './Input'
import { newMaster } from '../../store/owlh/actions';
import { connect } from 'react-redux';
import { validateForm } from '../Shared/validation'


const NewMaster = (props) => {

  const [master, setMaster] = useState({})
  const [textError, setTextError] = useState({})
  const [myError, setMyError] = useState(false)
  const [validationFields, setValidationFields] = useState({
      name: true,
      desc: true,
      port: true,
      ip: true
  })

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

  useEffect(() => {
    resetFormData()
  }, []);

  const resetFormData = () => { 
    setMyError(false)
    setMaster({
      name: "",
      desc: "",
      port: "",
      ip: "",
      active: false
    })
  }

  const getFormData = () => {
    if (master.name == "") {return}
    setMyError(false)

    const [hasError, validationResult] = validateForm(master)
    setValidationFields({
      ...validationResult
    })
    if (hasError) {
      setMyError(true)
      return
    }

    props.addMaster(master)
    resetFormData()
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
         {myError ? <span>Validation Error, please review your inputs</span> : null}
        <div style={{border: '2px solid'}}>
            <Input id="name" name="name" caption="Master Name" inputType="text" value={master.name|| ''} onChange={handleChange}/>
            {!validationFields.name ? <span style={{color:'red'}}>Name value is incorrect.</span> : null}
            <Input id="ip" name="ip" caption="Master IP" inputType="text" value={master.ip|| ''} onChange={handleChange}/>
            {!validationFields.ip ? <span style={{color:'red'}}>Ip should be a valid IPv4 or hostname</span> : null}
            <Input id="port" name="port" caption="Master Port" inputType="text" value={master.port|| ''} onChange={handleChange}/>
            {!validationFields.port ? <span style={{color:'red'}}>Port should be a number</span> : null}
            <Input id="desc" name="desc" caption="Master Description" inputType="text" value={master.desc|| ''} onChange={handleChange}/>
            {!validationFields.desc ? <span style={{color:'red'}}>Description should has more than 3 chars</span> : null}
            <div className="AlignRight input-group">
                {/* <NavLink to="/" type="button" className="m-3 p-2 w-25 btn btn-primary" onClick={getFormData()}><h5>Add</h5></NavLink> */}
                <button type="button" className="m-3 p-2 w-25 btn btn-danger" onClick={resetFormData}><h5>Cancel</h5></button>
                <button type="button" className="m-3 p-2 w-25 btn btn-primary" onClick={getFormData}><h5>Add</h5></button>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
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
