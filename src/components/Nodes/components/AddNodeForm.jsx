import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Enroll } from '../../../store/node/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import { EditNode, ToggleAddNodeForm } from '../../../store/node/actions'

const AddNodeForm = (props) =>  {
    const [groupsSelected, setGroupsSelected] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        ip: "",
        port: "",
        nodeuser: "",
        nodepass: ""
    });

    //load current node data if button 'edit node' is pressed
    useEffect(() => {
        if(props.isEditNode){
            setFormData({
                name: props.nodeToEdit.name,
                ip: props.nodeToEdit.ip,
                port: props.nodeToEdit.port,
                nodeuser: props.nodeToEdit.nodeuser,
                nodepass: props.nodeToEdit.nodepass
            })
        }else{
            setFormData({
                name: '',
                ip: '',
                port: '',
                nodeuser: '',
                nodepass: '',
            })
        }
    },[props.isEditNode])

    const groupItems = (props.allGroupList || []).map(group => {
        return <ul className="checkbox-grid" key={group["guuid"]}>
            <input type="checkbox" value={group["guuid"]} name={group["gname"]} onChange={handleCheck}/>
            <label htmlFor={group["gname"]}>&nbsp;{group["gname"]}</label>
        </ul>
    })

    const getData = () => {             
        const enrollData = {
            Node:formData,
            Group:groupsSelected,
            Suricata:{}
        }   

        props.toggleProgressBar(true)
        props.enroll(enrollData)
        props.toggleAddNodeForm()
    }

    const editNodeData = () => {
        props.toggleProgressBar(true)
        formData.id = props.nodeToEdit.id    
        props.editNode(formData)
    }

    function handleCheck(e){
        if(!groupsSelected.includes(event.target.value)){
            setGroupsSelected([...groupsSelected, event.target.value])
        }else{
            setGroupsSelected(groupsSelected.filter((e) => ( e !== event.target.value )))
        }
    }
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <div>
                <form> 
                    {
                        props.nodeToEdit.id == undefined || props.nodeToEdit.id == null || props.nodeToEdit.id == ""
                        ?                 
                        <h4>Add node form</h4>      
                        :
                        <h4>Edit node form</h4>      
                    }
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text wt-125">Node Name</span>
                                </div>
                                <input type="text" className="form-control" id="nodename" name="name" placeholder="node-name" value={formData.name} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text wt-125">Node IP</span>
                                </div>
                                <input type="text" className="form-control" id="nodeip" name="ip" placeholder="x.x.x.x" value={formData.ip} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text wt-125">Node Port</span>
                                </div>
                                <input type="text" className="form-control" id="nodeport" name="port" placeholder="e.g: 50002" value={formData.port} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text wt-125">Node user</span>
                                </div>
                                <input type="text" className="form-control" id="nodeuser" name="nodeuser" placeholder="Node user..." value={formData.nodeuser} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text wt-125">Node password</span>
                                </div>
                                <input type="password" className="form-control" id="nodepass" name="nodepass" placeholder="Node password..." value={formData.nodepass} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {
                        props.nodeToEdit.id == undefined || props.nodeToEdit.id == null || props.nodeToEdit.id == ""
                        ?
                        <div>
                            <br/>
                            <h4>Available groups</h4>      
                            <div >
                                {groupItems}
                            </div>
                            <br/><br/><br/>
                            <div className="text-right">
                                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {getData()}}>Add</a>
                            </div>
                        </div>
                        :
                        <div className="text-right">
                            <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {editNodeData()}}>Edit</a>
                        </div>   
                                            
                    }                    
                </form>
            </div>
        </div>
    )}

const mapStateToProps = (state) => {
    return {
        allGroupList: state.groups.allGroupList,
        nodeToEdit: state.node.nodeToEdit,
        isEditNode: state.node.isEditNode,
    }
}

const mapDispatchToProps = (dispatch) => ({
    enroll: (data) => dispatch(Enroll(data)),
    editNode: (data) => dispatch(EditNode(data)),
    toggleAddNodeForm: () => dispatch(ToggleAddNodeForm()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(AddNodeForm)