import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {ProgressBar} from 'react-bootstrap'
import { ToggleProgressBar, ToggleModalWindow, ModalButtonClicked } from '../../../store/webUtilities/actions'
import { GetAllGroups } from '../../../store/groups/actions'
import { FaTrashAlt } from "react-icons/fa";

const GroupDetails = (props) => {
    
    useEffect(() => {        
        props.toggleProgressBar(true);
        props.getAllGroups();
    }, [])
    
    useEffect(() => {
        nodesForThisGroup(props.groupToDetails.guuid)
    }, [props.allGroupList])

    const nodesForThisGroup = (guuid) => {        
        const totalList = Object.entries(props.allGroupList || {}).map(([id , val]) =>{
            if(val.guuid == guuid){
                return Object.entries(val.Nodes || {}).map(([nodesId , nodes]) =>{
                    console.log(nodes)
                    console.log(nodes.nname)
                    return <tr>
                        <td>{nodes.nname}</td>
                        <td>{nodes.nip}</td>
                        <td> <FaTrashAlt size={21} className="iconRed" onClick={() => {}}/></td>
                    </tr>
                })
            }
        });
        return totalList
    }

    return (
        <div>
            <Menu />
             <Banner title={"Group "+props.groupToDetails.gname} subtitle="Group details" />
            {props.progressBar ? <ProgressBar animated now={100} /> : null}

            <div>
                <b>Nodes</b>
                <a className="btn btn-primary float-right text-decoration-none text-white right m-1" onClick={() => {}}>Add node</a>
                <a className="btn btn-success float-right text-decoration-none text-white right m-1" onClick={() => {}}>Sync all</a>
                <a className="btn btn-secondary float-right text-decoration-none text-white right m-1" onClick={() => {window.history.back();}}>Back</a>
            </div>
            
            <div>
                <table className="table table-hover table-layout-fixed">
                    <thead>
                        <tr>
                            <th>Node name</th>
                            <th>Node IP</th>
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nodesForThisGroup(props.groupToDetails.guuid)}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        progressBar: state.webUtilities.progressBar,
        groupToDetails: state.groups.groupToDetails,
        allGroupList: state.groups.allGroupList,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getAllGroups: () => dispatch(GetAllGroups()),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(GroupDetails)