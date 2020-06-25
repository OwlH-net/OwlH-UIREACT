import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

const AlertDialog = (props) => {
    const [show, setShow] = useState(true);
    // setShow(true)
    console.log("First state")
    console.log(show)
    if (show) {
        console.log("Second state")
        console.log(show)
        setTimeout(function(){ setShow(false) }, 3000);
        return (
            <Alert id={props.id} variant={props.variant} onClose={() => setShow(false)} dismissible>
                <b>{props.title} Error!</b> {props.error}
            </Alert>
        );
    }else{
        console.log("Last state")
        console.log(show)
        return <div></div>
    }
}

export default AlertDialog
