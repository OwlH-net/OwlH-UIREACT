import React from 'react';
import { BsPencilSquare, BsCheck, BsBookmarkFill, BsTrashFill } from "react-icons/bs";
import { deleteMaster, toggleMaster } from '../../store/owlh/actions';
import { getMasterDataToEdit, loginSetActiveMaster } from '../../store/login/actions'
import { connect, useStore } from 'react-redux';


const Master = (props) => {
  const masterDelete = (masterID) => {
    props.masterDeleteProp(masterID)
  }

  const activeMaster = (masterList, masterID) => {
    const newActiveMaster = masterList.filter(master => master.name == masterID);

    props.loginSetActiveMaster(newActiveMaster)

    props.masterActiveProp(masterID)
  }
  
  const store = useStore()
  const masterList = store.getState().owlhReducer.masterList

  const editMaster = (mList, masterID) => {
    const master = mList.filter(master => master.name == masterID);
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
          <span onClick={() => {activeMaster(masterList, props.name)}}><BsBookmarkFill size={25} className="iconBlue"/></span>
          <span onClick={() => {masterDelete(props.name)}}><BsTrashFill size={25} className="iconRed"/></span>
      </td>
    </tr>
  )
}


// export default NewMaster;
const mapDispatchToProps = dispatch => {
  const rmMaster = (masterID) => {return deleteMaster(masterID)}
  const activeMaster = (masterID) => {return toggleMaster(masterID)}
  const setActiveMaster = (master) => {return loginSetActiveMaster(master)}
  const midGetMasterDataToEdit = (masterID) => {return getMasterDataToEdit(masterID)}
  return {
    masterDeleteProp: (masterID) => dispatch(rmMaster(masterID)),
    masterActiveProp: (masterID) => dispatch(activeMaster(masterID)),
    loginSetActiveMaster: (master) => dispatch(setActiveMaster(master)),
    locGetMasterDataToEdit: (masterID) => dispatch(midGetMasterDataToEdit(masterID))

  }
}

const withProps = connect(null, mapDispatchToProps);
export default withProps(Master)

// export default Master;
