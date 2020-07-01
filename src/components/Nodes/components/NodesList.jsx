import React from 'react'
import { FaBoxOpen, FaDesktop, FaCog, FaArrowAltCircleDown, FaClipboardList, FaArchive, FaCogs, FaTrashAlt } from "react-icons/fa";

const NodesList = (props) => {
    return (
        <div>
            <table className="table table-hover table-layout-fixed">
                <thead>
                    <tr>
                        <th>Node name</th>
                        <th>Node status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(props.allNodesList).map(([id , val]) =>
                            <tr key={id}>
                                <td key={id+'name'}>{props.allNodesList[id]["name"]}</td>
                                <td key={id+'ip'}>{props.allNodesList[id]["ip"]}</td>
                                <td width="33%" key={id+'port'}>
                                    <span>
                                        <FaBoxOpen /> Mode services configuration <br/>
                                        <FaDesktop /> Node monitoring <br/>
                                        <FaCog /> Edit node configuration <br/>
                                        <FaArrowAltCircleDown /> See node files <br/>
                                        <FaClipboardList /> hange control <br/>
                                        <FaArchive /> Incident data <br/>
                                        {/* <div className="line"></div> */}
                                        <hr className="line"></hr>
                                        <FaCogs /> Modify node <br/>
                                        <FaTrashAlt /> Delete node <br/>
                                    </span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default NodesList