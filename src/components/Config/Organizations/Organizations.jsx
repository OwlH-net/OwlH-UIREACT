import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import {FaTrashAlt, FaEdit, FaInfoCircle} from 'react-icons/fa'
import { GetAllOrgs, DeleteOrg, ToggleEditOrganization, EditOrg } from '../../../store/config/actions'
import { ToggleAddOrganizationForm, AddNewOrg, GetOrganizationNodes, ToggleOrgNodeList } from '../../../store/config/actions'
import { ToggleProgressBar, ToggleModalWindow, ModalButtonClicked } from '../../../store/webUtilities/actions'
import {ProgressBar} from 'react-bootstrap'
import Footer from '../../Shared/Footer'
import AlertDialog from '../../Shared/AlertDialog'
import ModalWindow from '../../Shared/ModalWindow'

const Organizations = (props) => {
    const [orgNodesList, setOrgNodesList] = useState([])
    const [orgsSelected, setOrgsSelected] = useState('')
    const [orgNameToDelete, setOrgNameToDelete] = useState('')
    const [addOrg, setAddOrg] = useState({
        name:'',
        desc:'',
        default: 'false',
    })
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

    useEffect(() => {
        if(props.modalActionSelected.status){
            //call delete node and get all nodes at axios
            props.deleteOrg(orgsSelected)

            //setState for delete node uuid selected
            setOrgNameToDelete('')
            setOrgsSelected('')
        }
        //disable modal action
        props.modalButtonClicked({status:false, id:props.modalActionSelected.id})
    }, [props.modalActionSelected.status]);

    // //split node names
    // useEffect(() => {
    //     if(props.AllOrgNodes.nodes != null){
    //         var data = props.AllOrgNodes.nodes.split(",")
    //         setOrgNodesList(data)
    //     }
    // }, [props.AllOrgNodes])

    function EditOrganization(){
        props.editOrg(orgData)
    }

    //set data from org selected 
    function editOrgData(id, orgName, orgDesc, orgDefault){
        setOrgData({
            uuid: id,
            name: orgName,
            desc: orgDesc,
            default: orgDefault            
        })

        props.toggleEditOrganization(id)
    }

    //add org
    function AddNewOrganization(){
        props.toggleProgressBar(true);
        props.toggleAddOrganizationForm(false)
        props.addNewOrg(addOrg)
    }

    //Add data for org 
    function handleAddOrg(e){
        setAddOrg({
            ...addOrg,
            [event.target.name]: event.target.value
        })
    }

    function deleteOrganization(orgID, name){
        setOrgsSelected(orgID)
        setOrgNameToDelete(name)
        props.toggleModalWindow(true)
    }
    
    //modify data for org selected
    function handleChange(e){
        setOrgData({
            ...orgData,
            [event.target.name]: event.target.value
        })
    }
    
    //get all nodes for an organization
    function getAllNodesForOrganization(id){
        props.getOrganizationNodes(id)
        props.toggleOrgNodeList(true)
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
                    <FaInfoCircle size={21} className="iconBlue" onClick={() => {getAllNodesForOrganization(id)}}/>&nbsp;
                    <FaEdit size={21} className="iconBlue" onClick={() => {editOrgData(id, org["name"], org["desc"], org["default"])}}/> &nbsp;
                    <FaTrashAlt size={21} className="iconRed" onClick={() => {deleteOrganization(id, org["name"])}}/>&nbsp;
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
                        <button type="button" className="btn btn-primary float-right text-decoration-none text-white" onClick={() => {EditOrganization()}}>Edit</button>       
                        <button type="button" className="btn btn-secondary float-right text-decoration-none text-white mx-2" onClick={() => {props.toggleEditOrganization('')}}>Close</button>       
                    </td>
                </tr>
                :
                null
            }
            {
                props.toggleNodesOrgList
                ?
                <tr key={id+'-edit'}>
                    <td colSpan={3}>
                        {props.AllOrgNodes.nodes}
                    </td>
                    <td>
                        <button type="button" className="btn btn-secondary float-right text-decoration-none text-white mx-2" onClick={() => {props.toggleOrgNodeList(false)}}>Close</button>       
                    </td>
                </tr>
                :
                null
            }
        </>
    })

    // //Call alert list for every map item
    // const nodesList = (orgNodesList || []).map(node => {
    //     console.log(node);
    //     return <li key={node}>
    //         {node}
    //         <FaTrashAlt size={21} className="iconRed" onClick={() => {}}/>&nbsp;
    //     </li>
    // })

    //Call alert list for every map item
    const alertItems = (props.alertList || []).map(alert => {
        return <AlertDialog key={alert.id} id={alert.id} title={alert.title} subtitle={alert.subtitle} variant={alert.variant}/>
    })

    return (
        <div>
            {/* modal window */}
            <ModalWindow title='Delete Organization' subtitle={'Are you sure you want to delete organization '+orgNameToDelete+' ?'}
                variantColor='danger' btn='Delete' id='deleteOrg' />    

            <Menu />

            {/* Alert dialog */}
            {alertItems}

            <Banner title="Config" subtitle="Organizations panel" />
            
            {props.progressBar ? <ProgressBar animated now={100} /> : null}

            <div className="m-3 p-3">
                <button className="btn btn-primary float-right text-decoration-none text-white" type="button" onClick={() => {props.toggleAddOrganizationForm(true)}}>Add</button>
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
                <br />
                <br />
                {
                    props.toggleAddOrgForm
                    ?
                    <div>
                    <h5>Add new Organization</h5>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <span className="input-group-text wt-125">Organization Name</span>
                            <input type="text" className="form-control" name="name" placeholder="Organization name..." value={addOrg.name} onChange={handleAddOrg} />
                        </div>
                        <br />
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <span className="input-group-text wt-125">Organization description</span>
                            <input type="text" className="form-control" name="desc" placeholder="Organization description..." value={addOrg.desc} onChange={handleAddOrg} />
                        </div>
                        <br />
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            {
                                <>
                                    {
                                        addOrg.default == "true"
                                        ?
                                        <><p>Create as default organization?</p> &nbsp; <input type="checkbox" value={"false"} name="default" onChange={handleAddOrg} checked/></>
                                        :
                                        <><p>Create as default organization?</p> &nbsp; <input type="checkbox" value={"true"} name="default" onChange={handleAddOrg}/></>
                                    }
                                </>
                            }  
                        </div>

                        <button className="btn btn-primary float-right text-decoration-none text-white" type="button" onClick={() => {AddNewOrganization()}}>Add</button>
                        <button className="btn btn-secondary float-right text-decoration-none text-white mx-2" type="button" onClick={() => {props.toggleAddOrganizationForm(false)}}>Close</button>

                    </div>
                    :
                    null
                }
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allOrgsList: state.config.allOrgsList,
        AllOrgNodes: state.config.AllOrgNodes,
        toggleNodesOrgList: state.config.toggleNodesOrgList,
        toggleAddOrgForm: state.config.toggleAddOrgForm,
        toggleEditOrg: state.config.toggleEditOrg,
        progressBar: state.webUtilities.progressBar,
        modalActionSelected: state.webUtilities.modalActionSelected,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllOrgs: () => dispatch(GetAllOrgs()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    toggleEditOrganization: (id) => dispatch(ToggleEditOrganization(id)),
    deleteOrg: (id) => dispatch(DeleteOrg(id)),
    editOrg: (id) => dispatch(EditOrg(id)),
    toggleAddOrganizationForm: (status) => dispatch(ToggleAddOrganizationForm(status)),
    addNewOrg: (org) => dispatch(AddNewOrg(org)),
    toggleModalWindow: (status) => dispatch(ToggleModalWindow(status)),
    modalButtonClicked: (option) => dispatch(ModalButtonClicked(option)),
    getOrganizationNodes: (id) => dispatch(GetOrganizationNodes(id)),
    toggleOrgNodeList: (status) => dispatch(ToggleOrgNodeList(status)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(Organizations)