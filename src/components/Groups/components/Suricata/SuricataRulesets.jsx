import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaPlus, FaSyncAlt, FaTrash } from "react-icons/fa";
import { DisplayRulesetList, GetRulesetList } from '../../../../store/groups/actions'
import { ToggleProgressBar } from '../../../../store/webUtilities/actions'

const SuricataRulesets = (props) => {

    const displayshowRulesetList = () => {
        const totalList = Object.entries(props.rulesetList || {}).map(([id , rset]) =>{
            return <tr className="background-grey" key={id} >
                <td width="20%">{rset.name}</td>
                {
                    rset.checked == "true"
                    ?
                    <td colSpan={2}>
                        <ul className="checkbox-grid">
                            <input type="checkbox" value={rset.name} name={rset.name} readOnly checked disabled/>
                        </ul>
                    </td>
                    :
                    <td colSpan={2}>
                        <ul className="checkbox-grid">
                            <input type="checkbox" value={rset.name} name={rset.name}/>
                        </ul>
                    </td>
                }
            </tr>
        })
        return  <>
            {totalList}
            <tr className="background-grey">
                <td colSpan={3}>
                    <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {}}>Add</a>
                    <a className="btn btn-secondary float-right text-decoration-none text-white right mx-3" onClick={() => {props.displayRulesetList(false)}}>Close</a>
                </td>
            </tr>
        </>
    }

    const currentRulesetsSelected = () => {
        return Object.entries(props.rulesetList || {}).map(([id , rset]) =>{
            return <ul className="checkbox-grid" key={id}>
                {
                    rset.checked == "true"
                    ?
                    <span className="badge badge-pill bg-dark align-text-bottom text-white size18">{rset.name} | <FaTrash size={18} className="iconRed" onClick={() => {}}/> </span>
                    :
                    null
                }
            </ul>
        })
    }

    const getGroupRuleset = () => {
        props.toggleProgressBar(true)
        props.getRulesetList(props.groupToDetails.guuid)
    }

    return (
        <table className="table table-hover table-layout-fixed">
            <tbody>
                <tr>
                    <td width="20%">Ruleset <FaPlus size={21} className="iconBlue" onClick={() => {getGroupRuleset()}} /> <FaSyncAlt size={21} className="iconBlue"/> </td>
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
    )
}

const mapStateToProps = (state) => {
    return {
        allGroupList: state.groups.allGroupList,
        showRulesetList: state.groups.showRulesetList,
        rulesetList: state.groups.rulesetList,
        groupToDetails: state.groups.groupToDetails,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getGroupSuricataList: (groupID) => dispatch(GetGroupSuricataList(groupID)),
    displayRulesetList: (status) => dispatch(DisplayRulesetList(status)),    
    getRulesetList: (group) => dispatch(GetRulesetList(group)),    
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(SuricataRulesets)