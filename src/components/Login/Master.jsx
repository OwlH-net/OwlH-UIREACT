import React from 'react';
import { BsPencilSquare, BsCheck, BsBookmarkFill, BsTrashFill } from "react-icons/bs";
import { deleteMaster, toggleMaster } from '../../store/owlh/actions';
import { getMasterDataToEdit } from '../../store/login/actions'
import { connect, useStore } from 'react-redux';


const Master = (props) => {
  const masterDelete = (masterID) => {
    console.log(masterID)
    props.masterDeleteProp(masterID)
  }
  const activeMaster = (masterID) => {
    console.log(masterID)
    props.masterActiveProp(masterID)
  }
  
  const store = useStore()
  const masterList = store.getState().owlhReducer.masterList

  const editMaster = (mList, masterID) => {
    console.log("edit master")
    console.log(masterID)
    console.log(mList)


    const master = mList.filter(master => master.name == masterID);
    console.log("Edit Master")
    console.log(master)
    props.locGetMasterDataToEdit(master)
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.ip}</td>
      <td>{props.port}</td>
      <td>{props.active ? <BsCheck size={25} className="green-text"/> : null}</td>
      <td className={props.status == "Online" ? "green-text": "red-text"}>{props.status}</td>
      <td>
          <span onClick={() => {editMaster(masterList, props.name)}}><BsPencilSquare size={25} className="iconBlue"/></span>
          <span onClick={() => {activeMaster(props.name)}}><BsBookmarkFill size={25} className="iconBlue"/></span>
          <span onClick={() => {masterDelete(props.name)}}><BsTrashFill size={25} className="iconRed"/></span>
      </td>
    </tr>
  )
}


// export default NewMaster;
const mapDispatchToProps = dispatch => {
  console.log("dispatch to props")
  const rmMaster = (masterID) => {return deleteMaster(masterID)}
  const activeMaster = (masterID) => {return toggleMaster(masterID)}
  const midGetMasterDataToEdit = (masterID) => {return getMasterDataToEdit(masterID)}
  return {
    masterDeleteProp: (masterID) => dispatch(rmMaster(masterID)),
    masterActiveProp: (masterID) => dispatch(activeMaster(masterID)),
    locGetMasterDataToEdit: (masterID) => dispatch(midGetMasterDataToEdit(masterID))

  }
}

const withProps = connect(null, mapDispatchToProps);
export default withProps(Master)

// export default Master;
