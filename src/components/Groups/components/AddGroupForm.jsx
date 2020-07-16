import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { ToggleAddNodeForm, ToggleProgressBar } from '../../../store/webUtilities/actions'
import { AddGroup } from '../../../store/groups/actions'

const AddGroupForm = (props) => {
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

    const getData = () => {    
        console.log(formData)         
        props.toggleProgressBar(true)
        props.toggleAddNodeForm()
        props.addGroup(formData)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
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
                        <input type="text" className="form-control" id="groupname" name="name" placeholder="group-name"  onChange={handleChange}/>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text wt-125">Node description</span>
                        </div>
                        <input type="text" className="form-control" id="groupdesc" name="desc" placeholder="group-name"  onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {getData()}}>Add</a>
            </div>  
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGroupList: state.groups.allGroupList,
        nodeToEdit: state.webUtilities.nodeToEdit,
        isEditNode: state.webUtilities.isEditNode,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addGroup: (data) => dispatch(AddGroup(data)),
    toggleAddNodeForm: () => dispatch(ToggleAddNodeForm()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(AddGroupForm)