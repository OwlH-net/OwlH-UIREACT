import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../Menu/Menu'
import Banner from '../Banner/Banner'
import Footer from '../Footer'
import FileContent from './FileContent'
import { ToggleProgressBar } from '../../../store/webUtilities/actions';
import  { useHistory } from 'react-router-dom'
import AlertDialog from '../AlertDialog'

const index = (props) => {

    //Call alert list for every map item
    const alertItems = (props.alertList || []).map(alert => {
        return <AlertDialog key={alert.id} id={alert.id} title={alert.title} subtitle={alert.subtitle} variant={alert.variant}/>
    })

    return (
        <div>
            {
                //Redirect to groups when the webpage is reloaded!
                Object.keys(props.fileToDisplay).length === 0 || Object.keys(props.fileTypeToDisplay).length === 0
                ?
                useHistory().push("/Groups")
                :
                null
            }

            <Menu />

            {alertItems}

            <Banner title="Display Files" subtitle="file name here" />  
            {props.progressBar ? <ProgressBar animated now={100} /> : null}
        
            <FileContent />

            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        groupToDetails: state.groups.groupToDetails,
        allGroupList: state.groups.allGroupList,
        fileToDisplay: state.webUtilities.fileToDisplay,
        fileTypeToDisplay: state.webUtilities.fileTypeToDisplay,
        alertList: state.webUtilities.alertList,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getFileContent: (data) => dispatch(GetFileContent(data)),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)