import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import { GetAllOrgs, DeleteOrg, ToggleEditOrganization, EditOrg } from '../../../store/node/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import {ProgressBar} from 'react-bootstrap'

const Organizations = (props) => {
    // const [orgsSelected, setOrgsSelected] = useState([])
    const [orgData, setOrgData] = useState({
        uuid:'',
        name:'',
        desc:'',
        default: 'false',
    })

    useEffect(() => {
        props.toggleProgressBar(true);
        props.getAllOrgs();
    }, [])

    function EditOrganization(){
        props.editOrg(orgData)
    }

    //set data from org selected 
    function editOrgData(id, orgName,  orgDesc, orgDefault){
        setOrgData({
            uuid: id,
            name: orgName,
            desc: orgDesc,
            default: orgDefault            
        })

        props.toggleEditOrganization(id)
    }

    //modify data for org selected
    function handleChange(e){
        setOrgData({
            ...orgData,
            [event.target.name]: event.target.value
        })
    }

    const orgsList = Object.entries(props.allOrgsList || {}).map(([id , org]) =>{
        return <>
            <tr key={id+'-list'}>
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
                    <FaEdit size={21} className="iconBlue" onClick={() => {editOrgData(id, org["name"], org["desc"], org["default"])}}/>
                    <FaTrashAlt size={21} className="iconRed" onClick={() => {props.deleteOrg(id)}}/>
                </td>
            </tr>
            {
                props.toggleEditOrg.status && props.toggleEditOrg.id == id 
                ?
                <tr key={id+'-edit'}>
                    <td colSpan={4}>
                        <div className="input-group mt-3 container">
                            <span className="input-group-text wt-125">Name:</span> <input className="form-control" type="text" placeholder="Insert organization name..." name="name" value={orgData.name} onChange={handleChange}></input>
                        </div>
                        <div className="input-group mt-3 container">
                            <span className="input-group-text wt-125">Description:</span> <input className="form-control" type="text" placeholder="Insert organization description..." name="desc" value={orgData.desc} onChange={handleChange}></input>
                        </div>
                        <div className="input-group mt-3 container">
                            {
                                <>
                                    {
                                        orgData.default == "true"
                                        ?
                                        <><p>Is default Organization?</p> &nbsp; <input type="checkbox" value={"false"} name="default" onChange={handleChange} checked/></>
                                        :
                                        <><p>Is default Organization?</p> &nbsp; <input type="checkbox" value={"true"} name="default" onChange={handleChange}/></>
                                    }
                                </>
                            }   
                        </div>    
                        <button type="button" className="m-3 p-1 btn btn-primary" onClick={() => {EditOrganization()}}>Edit</button>       
                    </td>
                </tr>
                :
                null
            }
        </>
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
        toggleEditOrg: state.node.toggleEditOrg,
        progressBar: state.webUtilities.progressBar,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllOrgs: () => dispatch(GetAllOrgs()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    toggleEditOrganization: (id) => dispatch(ToggleEditOrganization(id)),
    deleteOrg: (id) => dispatch(DeleteOrg(id)),
    editOrg: (id) => dispatch(EditOrg(id)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(Organizations)