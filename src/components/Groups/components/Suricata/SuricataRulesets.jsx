import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaPlus, FaSyncAlt, FaTrash } from "react-icons/fa";
import { DisplayAddRulesetForm, GetRulesetList, DeleteRulesetSelected, AddRulesetsToGroup, SyncGroupRuleset } from '../../../../store/groups/actions'
import { ToggleProgressBar, ToggleModalWindow, ModalButtonClicked } from '../../../../store/webUtilities/actions'
import ModalWindow from '../../../Shared/ModalWindow'

const SuricataRulesets = (props) => {

    const [groupRulesetSelected, setGroupRulesetSelected] = useState([])
    const [rulesetSelected, setRulesetSelected] = useState({})

    useEffect(() => {
        //reload ruleset list
        currentRulesetsSelected()
    },[props.rulesetList])

    const displayshowRulesetList = () => {
        const totalList = Object.entries(props.rulesetList || {}).map(([id , rset]) =>{
            return <tr className="background-grey" key={id} >
                <td width="20%">{rset.name}</td>
                {
                    rset.checked == "true"
                    ?
                    <td colSpan={2}>
                        <ul className="checkbox-grid">
                            <input type="checkbox" value={id} name={rset.name} readOnly checked disabled/>
                        </ul>
                    </td>
                    :
                    <td colSpan={2}>
                        <ul className="checkbox-grid">
                            <input type="checkbox" value={id} name={rset.name} onChange={handleCheck}/>
                        </ul>
                    </td>
                }
            </tr>
        })
        return  <>
            <tr>
                <td colSpan={3}><h5>Add ruleset to group</h5></td>
            </tr>
            {totalList}
            <tr className="background-grey">
                <td colSpan={3}>
                    <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {addRulesetsSelected()}}>Add</a>
                    <a className="btn btn-secondary float-right text-decoration-none text-white right mx-3" onClick={() => {props.displayAddRulesetForm(false)}}>Close</a>
                </td>
            </tr>
        </>
    }

    function handleCheck(e){
        if(!groupRulesetSelected.includes(event.target.value)){
            setGroupRulesetSelected([...groupRulesetSelected, event.target.value])
        }else{
            setGroupRulesetSelected(groupRulesetSelected.filter((e) => ( e !== event.target.value )))
        }
    }

    const addRulesetsSelected = () => {
        //send all checkboxes
        props.toggleProgressBar(true)
        props.addRulesetsToGroup({
            uuid: props.groupToDetails.guuid,
            rulesets: groupRulesetSelected.toString()
        })
    }

    const currentRulesetsSelected = () => {
        if(Object.keys(props.rulesetList || {}).length <= 0){
            return <p><b>There are no rulesets selected...</b></p>
        }
        const allrsets = Object.entries(props.rulesetList || {}).map(([id , rset]) =>{            
            return <ul className="checkbox-grid" key={id}>
                {
                    rset.checked == "true"
                    ?
                    <span >{rset.name} | <FaTrash size={18} className="iconRed" onClick={() => {deleteRuleset(id,  rset.name)}}/> </span>
                    :
                    null
                }
            </ul>
        })
        return allrsets
    }

    const getGroupRuleset = () => {
        props.toggleProgressBar(true)
        props.displayAddRulesetForm(true)
        props.getRulesetList(props.groupToDetails.guuid)
    }

    const SynchronizeGroupRuleset = () => {
        props.syncGroupRuleset({
            uuid: props.groupToDetails.guuid
        })
    }

    //modal for delete
    const deleteRuleset = (id, name) => {
        setRulesetSelected({rsetID: id ,rsetName: name})
        props.toggleModal(true)
    }

    useEffect(() => {
        if(props.modalActionSelected.status){            
            //call delete node and get all nodes at axios
            props.deleteRulesetSelected({
                uuid: props.groupToDetails.guuid,
                ruleset: rulesetSelected.rsetID,
            })
            //setState for delete node uuid selected
            setRulesetSelected('')
        }
        //disable modal action
        props.modalButtonClicked({status:false, id:props.modalActionSelected.id})
    }, [props.modalActionSelected.status]);

    return (
        <div>
            <ModalWindow title='Delete group ruleset' subtitle={'Are you sure you want to delete ruleset '+rulesetSelected.rsetName+' ?'}
                variantColor='danger' btn='Delete' id='deleteRuleset' />

            <h5 className="mt-3">Rulesets</h5>
            <table className="table table-layout-fixed">
                <tbody>
                    <tr>
                        <td width="20%">
                            <FaPlus size={21} className="iconBlue" onClick={() => {getGroupRuleset()}} /> &nbsp;
                            <FaSyncAlt size={21} className="iconBlue" onClick={() => {SynchronizeGroupRuleset()}}/> 
                        </td>
                        <td colSpan={2}> 
                            {currentRulesetsSelected()}
                        </td>
                    </tr>
                    {
                        props.showRulesetList
                        ?
                        displayshowRulesetList()                        
                        :
                        null
                    }
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGroupList: state.groups.allGroupList,
        showRulesetList: state.groups.showRulesetList,
        rulesetList: state.groups.rulesetList,
        groupToDetails: state.groups.groupToDetails,
        modalActionSelected: state.webUtilities.modalActionSelected,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    displayAddRulesetForm: (status) => dispatch(DisplayAddRulesetForm(status)),
    getGroupSuricataList: (groupID) => dispatch(GetGroupSuricataList(groupID)), 
    getRulesetList: (group) => dispatch(GetRulesetList(group)),
    toggleModal: (status) => dispatch(ToggleModalWindow(status)),
    modalButtonClicked: (option) => dispatch(ModalButtonClicked(option)),
    deleteRulesetSelected: (data) => dispatch(DeleteRulesetSelected(data)),
    addRulesetsToGroup: (data) => dispatch(AddRulesetsToGroup(data)),
    syncGroupRuleset: (data) => dispatch(SyncGroupRuleset(data)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(SuricataRulesets)