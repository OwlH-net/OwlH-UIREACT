import React from 'react'

const SuricataConfig = (props) => {
    return (
        <div>
            <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {}}>Sync</a>
            <table className="table table-hover table-layout-fixed">
                <tbody>
                    <tr>
                        <td width="20%">Ruleset</td>
                        <td colSpan={2}> <b>Here goes the ruleset selected!!</b> </td>
                    </tr>
                    <tr rowSpan={3}>
                        <td width="20%">Configuration</td>
                        <td>Master path</td>
                        <td>No suricata master path selected</td>
                    </tr>                   
                    <tr>
                        <td>Path</td>
                        <td>MD5</td>
                    </tr>
                    <tr>
                        <td>Node path</td>
                        <td>No suricata node path selected</td>
                    </tr>
                </tbody>                
            </table>
        </div>
    )
}

export default SuricataConfig
