import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {ProgressBar} from 'react-bootstrap'
import { ToggleProgressBar, ToggleModalWindow, ModalButtonClicked } from '../../../store/webUtilities/actions'
import { GetAllGroups } from '../../../store/groups/actions'
const GroupDetails = (props) => {
    
    useEffect(() => {
        props.toggleProgressBar(true);
        props.getAllGroups();
    }, [])
    
    useEffect(() => {
        nodesForThisGroup()
    }, [props.allGroupList])

    const nodesForThisGroup = (guuid) => {
        console.log(props.groupToDetails)
        const totalList = Object.entries(props.allGroupList || {}).map(([id , val]) =>{
            // console.log(val.guuid)
            if(val.guuid == guuid){
                console.log(val.guuid+"  --  "+val.gname)
            }
        });
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
                <a className="btn btn-secondary float-right text-decoration-none text-white right m-1" onClick={() => {}}>Back</a>
            </div>
            
            <div>
                {nodesForThisGroup(props.groupToDetails.guuid)}
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