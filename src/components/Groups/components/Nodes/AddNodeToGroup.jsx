import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { HideAllNodesGroup, AddNodesToGroup } from '../../../../store/groups/actions'
import { ToggleProgressBar } from '../../../../store/webUtilities/actions'

const AddNodeToGroup = (props) => {

    const [nodesSelected, setNodesSelected] = useState([])

    const groupItems = Object.entries(props.groupNodes || []).map(([id , val]) => {
        return <tr key={id}>
            <td>{val.name}</td>
            <td>{val.ip}</td>
            <td>
                <ul className="checkbox-grid">
                    {
                        val.checked == "true"
                        ?
                        <input type="checkbox" value={id} name={val.name} onChange={handleCheck} checked disabled/>
                        :
                        <input type="checkbox" value={id} name={val.name} onChange={handleCheck} />
                    }
                </ul>
            </td>
        </tr>        
    })

    function addNewNodesToGroup(){
        props.toggleProgressBar(true)
        props.addNodesToGroup({
            uuid:props.groupToDetails.guuid,
            nodes:nodesSelected
        })
    }

    function handleCheck(e){
        if(!nodesSelected.includes(event.target.value)){
            setNodesSelected([...nodesSelected, event.target.value])
        }else{
            setNodesSelected(nodesSelected.filter((e) => ( e !== event.target.value )))
        }
    }

    return (
        <div>
            <h4>Add nodes to group</h4>
            <table className="table table-hover table-layout-fixed">
                <thead>
                    <tr>
                        <th>Node name</th>
                        <th>Node IP</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {groupItems}
                </tbody>
            </table>
            <a className="btn btn-primary float-right text-decoration-none text-white right m-1" onClick={() => {addNewNodesToGroup()}}>Save</a>
            <a className="btn btn-secondary float-right text-decoration-none text-white right m-1" onClick={() => {props.hideAllNodesGroup()}}>Close</a>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        groupNodes: state.groups.groupNodes,
        groupToDetails: state.groups.groupToDetails,
        isAddNodesToGroup: state.groups.isAddNodesToGroup,
    }
}
const mapDispatchToProps = (dispatch) => ({
    hideAllNodesGroup: () => dispatch(HideAllNodesGroup()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    addNodesToGroup: (nodes) => dispatch(AddNodesToGroup(nodes)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(AddNodeToGroup)