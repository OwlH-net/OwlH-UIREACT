import React from 'react'
import { NavLink } from 'react-router-dom';
import {FaSortDown} from 'react-icons/fa'

const OrganizationPanel = (props) => { 
    return (
        <div className="my-3 p-3 bg-white rounded shadow-sm">
            <div>
                <h6 className="border-bottom border-gray pb-2 mb-0" onClick={() => {}}>Organizations <FaSortDown /> </h6>                
            </div>
            
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <td>Administrate organizations</td>                        
                        <td>
                            <NavLink to="Organizations" className="nav-link"><button type="button" className="mx-3 px-2 btn btn-primary">Admin Organizations</button></NavLink>                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrganizationPanel
