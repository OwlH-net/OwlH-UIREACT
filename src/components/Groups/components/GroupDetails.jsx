import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import GroupDetailsNodes from './GroupDetailsNodes'
import Banner from '../../Shared/Components/Banner/Banner'
import {ProgressBar} from 'react-bootstrap'
import { ToggleProgressBar, ToggleModalWindow, ModalButtonClicked } from '../../../store/webUtilities/actions'
import { GetAllGroups } from '../../../store/groups/actions'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { browserHistory } from 'react-router'

const GroupDetails = (props) => {
    
    useEffect(() => {        
        //check for empty group object for go back
        // {Object.keys(props.groupToDetails).length === 0 ? browserHistory.push('/Groups') : null }

        props.toggleProgressBar(true);
        props.getAllGroups();
    }, [])
    


    return (
        <div>
            <Menu />
             <Banner title={"Group "+props.groupToDetails.gname} subtitle="Group details" />
            {props.progressBar ? <ProgressBar animated now={100} /> : null}

            <Tabs className="mt-3">
                <TabList>
                    <Tab>Nodes</Tab>
                    <Tab>Suricata</Tab>
                    <Tab>Analyzer</Tab>
                </TabList>
            
                <TabPanel> <GroupDetailsNodes /> </TabPanel>
                <TabPanel> <GroupDetailsNodes /> </TabPanel>
                <TabPanel> <GroupDetailsNodes /> </TabPanel>
            </Tabs>

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