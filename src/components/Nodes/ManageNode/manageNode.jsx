import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import Footer from '../../Shared/Footer'
import { ToggleAddNodeForm, GetAllNodes, GetAllTags, ShowNodes } from '../../../store/node/actions'
import { SortTableIP, SortTableName, SetSearchBar } from '../../../store/node/actions'
import { GetAllOrgs } from '../../../store/config/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import { GetAllGroups } from '../../../store/groups/actions'
import { ProgressBar, Tabs } from 'react-bootstrap'
import AlertDialog from '../../Shared/AlertDialog'
import ManagerNodeTabs from './tabs';

const manageNode = (props) => {
    
    useEffect(() => {
    }, [])

    //Call alert list for every map item
    var loadAlertItems = (props.alertList || []).map(alert => {
        return <AlertDialog key={alert.id} id={alert.id} title={alert.title} subtitle={alert.subtitle} variant={alert.variant} />
    })

    return (
        <div>
            <Menu />

            {/* Alert dialog */}
            {loadAlertItems}

            <Banner title="Manage node" subtitle="display node name here" />
            {props.progressBar ? <ProgressBar animated now={100} /> : null}
            
            <div className="input-group mt-3 container">
                <ManagerNodeTabs />
            </div>
            <div className="m-3 p-3">
                {/* here tab content */}
            </div>

            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allNodesList: state.node.allNodesList,
        progressBar: state.webUtilities.progressBar,
        alertList: state.webUtilities.alertList,
        addNodeForm: state.node.addNodeForm,
        allGroupList: state.groups.allGroupList,

    }
}
const mapDispatchToProps = (dispatch) => ({
    sortTableIP: () => dispatch(SortTableIP()),
    sortTableName: () => dispatch(SortTableName()),
    getNodes: () => dispatch(GetAllNodes()),
    getAllTags: () => dispatch(GetAllTags()),
    toggleAddNodeForm: () => dispatch(ToggleAddNodeForm()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getAllGroups: () => dispatch(GetAllGroups()),
    showNodes: (status) => dispatch(ShowNodes(status)),
    setSearchBar: (values) => dispatch(SetSearchBar(values)),
    getAllOrgs: () => dispatch(GetAllOrgs()),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(manageNode)