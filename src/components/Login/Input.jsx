import React from 'react';

const Input = (props) => {
  return (
    <div className="media text-muted p-1 m-1">                      
        <div className="input-group">
            <span className="w-25 input-group-text">{props.caption}</span>
            <input id={props.id} type={props.inputType} name={props.name} value={props.value} onChange={props.onChange} className="form-control" />
        </div>
    </div>
  )
}

export default Input;