import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert'
import { toggleAlert } from '../../store/webUtilities/actions';

const AlertDialog = (props) => {
    var banners = [];

    // useEffect (() => {
    //     {props.errorBannerShow ?              
    //         `${this.props.id}-alert-dialog` = window.setTimeout(function(){ props.handleToggleStatus(false)}, 30000) : 
    //         window.clearTimeout(`${this.props.id}-alert-dialog`)
    //     }
    //  }, [props.errorBannerShow])

    // const disableAlert = () => {
    //     window.clearTimeout(`${this.props.id}-alert-dialog`)
    //     props.handleToggleStatus(false)
    // }

     useEffect (() => {
        props.errorBannerShow 
        ?  banners[`${props.id}-alert-dialog`] = window.setTimeout(function(){ props.handleToggleStatus(false)}, 10000) 
        :  window.clearTimeout(banners[`${props.id}-alert-dialog`])
     }, [props.errorBannerShow])

    const disableAlert = () => {
        window.clearTimeout(banners[`${props.id}-alert-dialog`])
        props.handleToggleStatus(false)
    }


    return(
        <div>
            {props.errorBannerShow ? <Alert id={props.id} variant={props.variant} onClick={() => disableAlert()} dismissible><b>{props.title}</b> {props.subtitle}</Alert> : null}
        </div>
    )

    // if(props.show){
    //     return (
    //         <div>
    //             <Alert id={props.id} variant={props.variant} onClick={() => disableAlert()} dismissible>
    //                 <b>{props.title} Error!</b> {props.error}
    //             </Alert>
    //         </div>
    //     )
    // }else{
    //     return(
    //         <div />
    //     )
    // }
}


const mapStateToProps = (state) => {
    return {
        errorBannerShow: state.webUtilities.errorBannerShow
    }
}

const mapDispatchToProps = (dispatch) => ({
    handleToggleStatus: (status) => dispatch(toggleAlert(status))
})

// const mapDispatchToProps = dispatch => {
//     const changeAlertStatus = (data) => {return toggleAlert(data)}

//   return {
//     handleToggleStatus: (data) => dispatch(changeAlertStatus(data))
//   }
// }

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(AlertDialog)