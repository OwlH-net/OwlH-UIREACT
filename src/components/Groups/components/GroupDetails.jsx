import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import GroupDetailsNodes from './Nodes/GroupDetailsNodes'
import GroupDetailsAnalyzer from './Analyzer/GroupDetailsAnalyzer'
import GroupDetailsSuricata from './Suricata/GroupDetailsSuricata'
import Banner from '../../Shared/Components/Banner/Banner'
import {ProgressBar} from 'react-bootstrap'
import { ToggleProgressBar, ToggleModalWindow, ModalButtonClicked } from '../../../store/webUtilities/actions'
import { GetAllGroups } from '../../../store/groups/actions'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import  { useHistory } from 'react-router-dom'

const GroupDetails = (props) => {
    
    useEffect(() => {        
        //check empty group object for go back    
        props.toggleProgressBar(true);
        props.getAllGroups();
    }, [])
    
    return (        
        <div>
            {
                //Redirect to groups when the webpage is reloaded!
                Object.keys(props.groupToDetails).length === 0
                ?
                useHistory().push("/Groups")
                :
                null
            }

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
                <TabPanel> <GroupDetailsSuricata /> </TabPanel>
                <TabPanel> <GroupDetailsAnalyzer /> </TabPanel>
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