import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert'
import { toggleAlert, ResetAxiosChangePass } from '../../store/webUtilities/actions';
// import { AlertList, Alert, AlertContainer } from "react-bs-notifier";

const AlertDialog = (props) => {
    var banners = [];

    useEffect (() => {
        //check if alert is allowed to be shown
        props.errorAlertShow
        ?  banners[`${props.id}-alert-dialog`] = setTimeout(function(){ disableAlert(banners[`${props.id}-alert-dialog`]) }, 4000) 
        :  disableAlert(banners[`${props.id}-alert-dialog`])
    }, [props.errorAlertShow])

    const disableAlert = (alertId) => {
        clearTimeout(alertId)
        props.handleToggleStatus(false)
        props.clearAxiosData()
    }

    return(
        <div>
            {props.errorAlertShow ? <Alert id={props.id} variant={props.variant} onClick={() => disableAlert(banners[`${props.id}-alert-dialog`])} dismissible><b>{props.title}</b> {props.subtitle}</Alert> : null}
        </div>
    )

}


const mapStateToProps = (state) => {
    return {
        passwordChange: state.webUtilities.passwordChange,
        errorAlertShow: state.webUtilities.errorAlertShow 
    }
}

const mapDispatchToProps = (dispatch) => ({
    handleToggleStatus: (status) => dispatch(toggleAlert(status)),
    clearAxiosData: () => dispatch(ResetAxiosChangePass())
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(AlertDialog)