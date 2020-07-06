import React, { useState, useEffect } from 'react'
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import { getAllNodes, PingNode } from '../../../store/node/actions'
import { connect } from 'react-redux';
import NodesList from './NodesList'

const index = (props) => {

    //getAllNodes
    useEffect(() => {
        props.getNodes()
    }, [])
    
    return (
        <div>
            <Menu />
            <Banner title="Nodes" subtitle="All nodes list" />
            <div className="m-3 p-3">
                <NodesList />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allNodesList: state.node.allNodesList,
        nodeStatus: state.node.nodeStatus,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getNodes: () => dispatch(getAllNodes())
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)