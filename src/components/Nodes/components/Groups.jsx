import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Enroll } from '../../../store/node/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import { EditNode, ToggleAddNodeForm,  SaveGroupsSelected } from '../../../store/node/actions'

const Groups = (props) => {
    const [groupsSelected, setGroupsSelected] = useState([])

    useEffect(() => {  
        (props.allGroupList || []).map(group => {
            if(group["default"] == "true"){           
                setGroupsSelected([...groupsSelected, group["guuid"]])
                props.saveGroupsSelected([...groupsSelected, group["guuid"]]);
            }
        })
    },[])

    function handleCheck(e){
        if(!groupsSelected.includes(event.target.value)){
            setGroupsSelected([...groupsSelected, event.target.value])
            props.saveGroupsSelected([...groupsSelected, group["guuid"]])
        }else{
            setGroupsSelected(groupsSelected.filter((e) => ( e !== event.target.value )))
            props.saveGroupsSelected(groupsSelected.filter((e) => ( e !== event.target.value )))
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
                    <h4>Available groups</h4>      
                    <div >
                        {groupItems}
                    </div>
                </div>
                :
                null
            }      
            <br />
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
    }
}

const mapDispatchToProps = (dispatch) => ({
    enroll: (data) => dispatch(Enroll(data)),
    editNode: (data) => dispatch(EditNode(data)),
    toggleAddNodeForm: () => dispatch(ToggleAddNodeForm()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    saveGroupsSelected: (groups) => dispatch(SaveGroupsSelected(groups)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(Groups)   