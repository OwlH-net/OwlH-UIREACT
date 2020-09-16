import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { SaveSelectedOrgs } from '../../../store/config/actions'
const Organizations = (props) => {

    const [orgsSelected, setOrgsSelected] = useState([])

    //save into store default orgs
    useEffect(() => {  
        Object.entries(props.allOrgsList || {}).map(([id , org]) => {
            if(org["default"] == "true"){           
                setOrgsSelected([...orgsSelected, id])
                props.saveSelectedOrgs([...orgsSelected, id])
            }
        })
    },[])

    function handleChange(e){
        if(!orgsSelected.includes(event.target.value)){
            setOrgsSelected([...orgsSelected, event.target.value])
            props.saveSelectedOrgs([...orgsSelected, event.target.value])
        }else{
            setOrgsSelected(orgsSelected.filter((e) => ( e !== event.target.value )))
            props.saveSelectedOrgs(orgsSelected.filter((e) => ( e !== event.target.value )))
        }
    }

    const orgItems = Object.entries(props.allOrgsList || {}).map(([id , org]) => {
        return <ul className="checkbox-grid" key={id}>        
            {
                org["default"] == "true"
                ?
                <input type="checkbox" value={id} name={org["name"]} onChange={handleChange} checked/>
                :
                <input type="checkbox" value={id} name={org["name"]} onChange={handleChange}/>
            }
            <label htmlFor={org["name"]}>&nbsp;{org["name"]}</label>
        </ul>
    }) 

    return (
        <div>
            {
                props.nodeToEdit.id == undefined || props.nodeToEdit.id == null || props.nodeToEdit.id == ""
                ?
                <div>
                    <br/>
                    <h4>Available Organizations</h4>      
                    <div >
                        {orgItems}
                    </div>
                    <br/>
                </div>
                :
                null                                            
            }      
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        nodeToEdit: state.node.nodeToEdit,
        allOrgsList: state.config.allOrgsList,
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveSelectedOrgs: (orgs) => dispatch(SaveSelectedOrgs(orgs)),
})

const withProps = connect(mapStateToProps,mapDispatchToProps);
export default withProps(Organizations)   