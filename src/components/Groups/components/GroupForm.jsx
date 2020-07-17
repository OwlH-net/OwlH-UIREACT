import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { ToggleAddNodeForm, ToggleProgressBar } from '../../../store/webUtilities/actions'
import { AddGroup, EditGroupSelected } from '../../../store/groups/actions'

const AddGroupForm = (props) => {
    const [editGroupValues, setEditGroupValues] = useState({
        name: "",
        desc: "",
        uuid: "",
    })
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        type: "Nodes",
        ruleset: "",
        rulesetID: "",
        mastersuricata: "",
        nodesuricata: "",
        masterzeek: "",
        nodezeek: "",
        interface: "",
        BPFfile: "",
        BPFrule: "",
        configFile: "",
        commandLine: "",
    });

    useEffect(() => {
        setEditGroupValues({
        name: props.groupToEdit.gname,
        desc: props.groupToEdit.gdesc,
        uuid: props.groupToEdit.guuid
    })
    },[props.groupToEdit])

    const EditGroup = () => {   
        props.toggleProgressBar(true)
        props.editGroupSelected(editGroupValues)
    }

    const AddDataForm = () => {    
        props.toggleProgressBar(true)
        props.toggleAddNodeForm()
        props.addGroup(formData)
    }

    const handleChangeAdd = (e) => {
        setFormData({            
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    const handleChangeEdit = (e) => {
        setEditGroupValues({            
            ...editGroupValues,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text wt-125">Node Name</span>
                        </div>
                        {
                            props.isEdit 
                            ?                            
                            <input type="text" className="form-control" id="groupname" name="name" placeholder="group-name" onChange={handleChangeEdit} value={editGroupValues.name}/>
                            :
                            <input type="text" className="form-control" id="groupname" name="name" placeholder="group-name" onChange={handleChangeAdd}/>
                        }
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text wt-125">Node description</span>
                        </div>
                        {
                            props.isEdit 
                            ?
                            <input type="text" className="form-control" id="groupdesc" name="desc" placeholder="group-name" onChange={handleChangeEdit} value={editGroupValues.desc}/>
                            :
                            <input type="text" className="form-control" id="groupdesc" name="desc" placeholder="group-name" onChange={handleChangeAdd}/>
                        }
                    </div>
                </div>
            </div>
            <div className="text-right">
                {
                    props.isEdit 
                    ?
                    <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {EditGroup()}}>Edit</a>
                    :
                    <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {AddDataForm()}}>Add</a>
                }
            </div>  
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isEdit: state.groups.isEdit,
        groupToEdit: state.groups.groupToEdit,
        allGroupList: state.groups.allGroupList,
        nodeToEdit: state.webUtilities.nodeToEdit,
        isEditNode: state.webUtilities.isEditNode,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addGroup: (data) => dispatch(AddGroup(data)),
    toggleAddNodeForm: () => dispatch(ToggleAddNodeForm()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    editGroupSelected: (group) => dispatch(EditGroupSelected(group)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(AddGroupForm)