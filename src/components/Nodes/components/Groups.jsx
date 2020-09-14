import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Enroll } from '../../../store/node/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import { EditNode, ToggleAddNodeForm } from '../../../store/node/actions'

const Groups = (props) => {
    const [groupsSelected, setGroupsSelected] = useState([])

    useEffect(() => {  
        (props.allGroupList || []).map(group => {
            if(group["default"] == "true"){           
                setGroupsSelected([...groupsSelected, group["guuid"]])
            }
        })
    },[])

    const getData = () => {   
        console.log(groupsSelected);
        const enrollData = {
            Node:props.form,
            Tags:props.tagsSelected.toString(),
            Group:groupsSelected,
            Suricata:{}
        }   
        props.toggleProgressBar(true)
        props.enroll(enrollData)
        props.toggleAddNodeForm()
    }

    const editNodeData = () => {
        console.log(groupsSelected);
        props.form.uuid = props.nodeToEdit.id            
        const editData = {
            Node: props.form,
            Tags: props.tagsSelected.toString(),
            Group:groupsSelected,
            Orgs:props.orgsSelected.toString(),
            Suricata:{}
        }   
        props.toggleProgressBar(true)
        props.editNode(editData)
    }

    function handleCheck(e){
        if(!groupsSelected.includes(event.target.value)){
            setGroupsSelected([...groupsSelected, event.target.value])
        }else{
            setGroupsSelected(groupsSelected.filter((e) => ( e !== event.target.value )))
        }
    }

    const groupItems = (props.allGroupList || []).map(group => {
        return <ul className="checkbox-grid" key={group["guuid"]}>        
            {
                group["default"] == "true"
                ?
                <input type="checkbox" value={group["guuid"]} name={group["gname"]} onChange={handleCheck} checked/>
                :
                <input type="checkbox" value={group["guuid"]} name={group["gname"]} onChange={handleCheck}/>
            }
            <label htmlFor={group["gname"]}>&nbsp;{group["gname"]}</label>
        </ul>
    }) 
    
    return (
        <div>
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGroupList: state.groups.allGroupList,
        nodeToEdit: state.node.nodeToEdit,
        isEditNode: state.node.isEditNode,
        allTagsList: state.node.allTagsList,
        allNodesList: state.node.allNodesList,        
        tagsSelected: state.node.tagsSelected,        
        orgsSelected: state.node.orgsSelected,        
    }
}

const mapDispatchToProps = (dispatch) => ({
    enroll: (data) => dispatch(Enroll(data)),
    editNode: (data) => dispatch(EditNode(data)),
    toggleAddNodeForm: () => dispatch(ToggleAddNodeForm()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(Groups)   