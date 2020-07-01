import React, { useState, useEffect } from 'react'
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import { getAllNodes } from '../../../store/node/actions'
import { connect } from 'react-redux';
import NodesList from './NodesList'

const index = (props) => {

    //getAllNodes
    useEffect(() => {
        props.getNodes()
    }, []);

    return (
        <div>
            <Menu />
            <Banner title="Nodes" subtitle="All nodes list" />
            <div className="m-3 p-3">
                <NodesList key="nodes" allNodesList={props.allNodesList} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allNodesList: state.node.allNodesList,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getNodes: () => dispatch(getAllNodes())
})

// const mapDispatchToProps = dispatch => {
//     const getAllNodesFromMaster = () => {return getAllNodes()}
//     return {
//         getNodes : () => dispatch(getAllNodesFromMaster())
//     }
// }

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)