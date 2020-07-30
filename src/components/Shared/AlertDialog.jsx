import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert'
import { toggleAlert, ResetAxiosChangePass, DeleteAlertToAlertList } from '../../store/webUtilities/actions';

const AlertDialog = (props) => {

    useEffect (() => {
        console.log(props);
        const alertTimeout = setTimeout(function(){ disableAlert(props.id) }, 4000)
    }, [])

    const disableAlert = (alertId) => {
        props.deleteAlert(alertId)
    }

    return(
        <div>
            {props.errorAlertShow ? <Alert id={props.id} variant={props.variant} onClick={() => disableAlert(props.id)} dismissible><b>{props.title}</b> {props.subtitle}</Alert> : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        // passwordChange: state.webUtilities.passwordChange,
        errorAlertShow: state.webUtilities.errorAlertShow 
    }
}

const mapDispatchToProps = (dispatch) => ({
    // handleToggleStatus: (status) => dispatch(toggleAlert(status)),
    clearAxiosData: () => dispatch(ResetAxiosChangePass()),
    deleteAlert: (alertId) => dispatch(DeleteAlertToAlertList(alertId))
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(AlertDialog)