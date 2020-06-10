import React from 'react';
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Input from './Input'


const NewMaster = (props) => {
  return (
    <div>
        <h4>New Master</h4>
        <div style={{border: '2px solid'}}>
            <Input caption="Master Name" inputType="text"/>
            <Input caption="Master IP" inputType="text"/>
            <Input caption="Master Port" inputType="text"/>
            <Input caption="Master Description" inputType="text"/>
            <div className="AlignRight input-group">
                <NavLink to="/" type="button" className="m-3 p-2 w-25 btn btn-primary"><h5>Add</h5></NavLink>
            </div>

        </div>
    </div>
  )
}

export default NewMaster;