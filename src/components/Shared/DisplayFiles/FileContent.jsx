import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { GetFileContent, ToggleProgressBar, SaveNewFileContent } from '../../../store/webUtilities/actions';
import { useHistory } from "react-router-dom";
import ReactJson from 'react-json-view'
import { json } from 'body-parser';

const FileContent = (props) => {
    let history = useHistory();
    const [newFileContent, SetNewFileContent] = useState('')
    const [jsonObject, SetJSONObject] = useState('')
    
    useEffect(() => {
        SetJSONObject(props.fileContentObject.fileContent)
        console.log(props.fileContentObject.fileContent)
    }, [props.fileContentObject.fileContentContent])

    useEffect(() => {
        SetJSONObject(props.fileContentObject)
        props.getFileContent({
            file: props.fileToDisplay,
            type: props.fileTypeToDisplay
        })
    }, [])
    
    const setNewFileContent = () => {
        props.toggleProgressBar(true)
        props.saveNewFileContent({
            path: props.fileToDisplay,
            content: newFileContent ,
        })
    }

    const handleChange = (e) => {
        SetNewFileContent(event.target.value)
    }    

    return (        
        <div>
            <div className="text-right mb-3">
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {setNewFileContent()}}>Save</a>
                <a className="btn btn-secondary float-right text-decoration-none text-white right mx-1" onClick={() => {history.goBack()}}>Close</a>
            </div>

            <br/>
            <br/>
            {/* <textarea className="form-control width100 height1000px" rows={25} defaultValue={props.fileContentObject.fileContent} onChange={handleChange}/> */}
            {/* <ReactJson src={jsonObject} /> */}
            {/* {jsonObject} */}

            <div className="text-right mt-3">
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {setNewFileContent()}}>Save</a>
                <a className="btn btn-secondary float-right text-decoration-none text-white right mx-1" onClick={() => {history.goBack()}}>Close</a>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        groupToDetails: state.groups.groupToDetails,
        allGroupList: state.groups.allGroupList,
        fileToDisplay: state.webUtilities.fileToDisplay,
        fileTypeToDisplay: state.webUtilities.fileTypeToDisplay,
        fileContentObject: state.webUtilities.fileContentObject,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getFileContent: (data) => dispatch(GetFileContent(data)),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    saveNewFileContent: (data) => dispatch(SaveNewFileContent(data)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(FileContent)