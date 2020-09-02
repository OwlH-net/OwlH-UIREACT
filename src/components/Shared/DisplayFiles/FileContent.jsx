import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { GetFileContent, ToggleProgressBar, SaveNewFileContent } from '../../../store/webUtilities/actions';
import { useHistory } from "react-router-dom";
import ReactJson from 'react-json-view'

const FileContent = (props) => {
    let history = useHistory();
    const [newFileContent, SetNewFileContent] = useState('')
    const [jsonObject, SetJSONObject] = useState('')
    const [isFileJSON, SetIsFileJSON] = useState(false)
    
    //clean previuos content and get file content
    useEffect(() => {        
        //restart state to empty
        SetJSONObject('')
        SetNewFileContent('')

        props.getFileContent({
            file: props.fileToDisplay,
            type: props.fileTypeToDisplay
        })
    }, [])

    useEffect(() => {
        var content = validateJSON(props.fileContentObject.fileContent)
        console.log(content);
        if (content){
            var data = JSON.parse(props.fileContentObject.fileContent);
            SetJSONObject(data)
            SetNewFileContent(data)
            SetIsFileJSON(true)
        }else{
            SetJSONObject(props.fileContentObject.fileContent)
            SetNewFileContent(props.fileContentObject.fileContent)
            SetIsFileJSON(false)
        }
    }, [props.fileContentObject.fileContent])
    
    //check if file is JSON type
    function validateJSON(body) {        
        try {
            var data = JSON.parse(body);
            return true;
        } catch(e) {
            return false;
        }
    }

    const checkNewFileContent = () => {
        //if newFileContent is empty, there are no changes to the text
        newFileContent == "" ? SetNewFileContent(jsonObject) : null 

        if(JSON.stringify(jsonObject) != JSON.stringify(newFileContent)){
            //launch modal
            console.log("DIFFERENTS!!!");
        }
        isFileJSON ? saveNewFileContent(JSON.stringify(newFileContent)) : saveNewFileContent(newFileContent)
    }

    const saveNewFileContent = (file) => {       
        props.toggleProgressBar(true)
        props.saveNewFileContent({
            path: props.fileToDisplay,
            content: file
        })
        history.goBack()
    }

    const handleChange = (e) => {
        SetNewFileContent(event.target.value)
    }    

    return (        
        <div>
            <div className="text-right mb-3">
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {checkNewFileContent()}}>Save</a>
                <a className="btn btn-secondary float-right text-decoration-none text-white right mx-1" onClick={() => {history.goBack()}}>Close</a>
            </div>

            <br/>
            <br/>

            {
                isFileJSON == true
            ?
                <ReactJson 
                    displayDataTypes={false} 
                    name={false} 
                    src={jsonObject} 
                    onEdit={e => {
                        SetNewFileContent(e.updated_src)
                    }}
                    onDelete={e => {
                        SetNewFileContent(e.updated_src)
                    }}
                    onAdd={e => {
                        SetNewFileContent(e.updated_src)
                    }}                
                />
            :
                <textarea className="form-control width100 height1000px" rows={25} defaultValue={props.fileContentObject.fileContent} onChange={handleChange}/>
            }

            <div className="text-right mt-3">
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {checkNewFileContent()}}>Save</a>
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