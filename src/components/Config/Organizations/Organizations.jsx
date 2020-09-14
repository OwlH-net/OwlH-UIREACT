import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import {GetAllOrgs } from '../../../store/node/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import {ProgressBar} from 'react-bootstrap'

const Organizations = (props) => {

    useEffect(() => {
        props.toggleProgressBar(true);
        props.getAllOrgs();
    }, [])

    const orgsList = Object.entries(props.allOrgsList || {}).map(([id , org]) =>{
        console.log(org);
        return <tr key={id}>
            <td>{
                org["default"] == "true"
                ?
                <span className="badge badge-pill bg-success align-text-bottom text-white">&nbsp;</span> 
                :
                <span className="badge badge-pill bg-danger align-text-bottom text-white">&nbsp;</span> 
            }</td>
            <td>{org["name"]}</td>
            <td>{org["desc"]}</td>
            <td>
                <FaEdit size={21} className="iconBlue" onClick={() => {}}/>
                <FaTrashAlt size={21} className="iconRed" onClick={() => {}}/>
            </td>
        </tr>
    })

    return (
        <div>
            <Menu />
            <Banner title="Config" subtitle="Organizations panel" />
            
            {props.progressBar ? <ProgressBar animated now={100} /> : null}

            <div className="m-3 p-3">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th width="10%">Default</th>
                            <th width="20%">Name</th>
                            <th width="50%">Descriptions</th>
                            <th width="20%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {orgsList}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allOrgsList: state.node.allOrgsList,
        progressBar: state.webUtilities.progressBar,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllOrgs: () => dispatch(GetAllOrgs()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(Organizations)