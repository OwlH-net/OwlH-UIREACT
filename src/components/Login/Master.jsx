import React from 'react';
import { BsPencilSquare, BsCheck, BsBookmarkFill, BsTrashFill } from "react-icons/bs";

const Master = (props) => {
  return (
    <tr>
        <td>{props.name}</td>
        <td>{props.ip}</td>
        <td>{props.port}</td>
        <td>{props.active ? <BsCheck size={25} className="green-text"/> : null}</td>
        <td className={props.status == "Online" ? "green-text": "red-text"}>{props.status}</td>
        <td>
            <BsPencilSquare size={25} className="iconBlue"/>
            <BsBookmarkFill size={25} className="iconBlue"/>
            <BsTrashFill size={25} className="iconRed"/>
        </td>
    </tr>
  )
}

export default Master;