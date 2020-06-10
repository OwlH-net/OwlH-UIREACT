import React from 'react';
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Master from './Master'


const MasterList = (props) => {

    const masterList = [
            {
                name: "master 1",
                ip: "192.160.1.110",
                port: "50001",
                description: "first master item",
                active: true,
                status: "Online"
            },
            {
                name: "master 3",
                ip: "192.160.1.111",
                port: "50001",
                description: "another master item",
                active: false,
                status: "Online"
            },
            {
                name: "master 4",
                ip: "192.160.1.114",
                port: "50001",
                description: "n- master item",
                active: false,
                status: "Offline"
            },
        ]

    const currentMasters = masterList.map(s => {
      return <Master key={s.name} {...s} />
    })

  return (
    <div>
    <h4>Master List</h4>
        <table className="table table-hover" >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>IP</th>
                    <th>Port</th>
                    <th>Active</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentMasters}
            </tbody>
        </table>
    </div>
  )
}

export default MasterList;