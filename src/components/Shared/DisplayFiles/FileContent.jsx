import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { GetFileContent, ToggleProgressBar } from '../../../store/webUtilities/actions';
import JoditEditor from "jodit-react";

const FileContent = (props) => {

    useEffect(() => {
        props.toggleProgressBar(true)

        props.getFileContent({
            file: props.fileToDisplay,
            type: props.fileTypeToDisplay
        })
    }, [])

    const [content, setContent] = useState(props.fileContentObject.fileContent)
    const editor = useRef(null)
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
    

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={() => {}}
        />
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
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(FileContent)