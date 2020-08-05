import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../Menu/Menu'
import Banner from '../Banner/Banner'
import Footer from '../Footer'
import { GetFileContent, ToggleProgressBar } from '../../../store/webUtilities/actions';
import  { useHistory } from 'react-router-dom'

const index = (props) => {

    useEffect(() => {
        props.toggleProgressBar(true)

        props.getFileContent({
            file: props.fileToDisplay,
            type:props.fileTypeToDisplay
        })
    }, [])

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
            <Banner title="Display Files" subtitle="file name here" />  
            {props.progressBar ? <ProgressBar animated now={100} /> : null}

            <div className="text-right mb-3">
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {}}>Save</a>
                <a className="btn btn-secondary float-right text-decoration-none text-white right mx-1" onClick={() => {}}>Close</a>
            </div>

<br />
<br />
<br />
<br />

            {/* <FileContent /> */}

            <div className="text-right mt-3">
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {}}>Save</a>
                <a className="btn btn-secondary float-right text-decoration-none text-white right mx-1" onClick={() => {}}>Close</a>
            </div>

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
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getFileContent: (data) => dispatch(GetFileContent(data)),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)