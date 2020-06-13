import * as ActionTypes from './login-action-types';

export function getMasterDataToEdit(master) {
  console.log(master)
  console.log("run Action GET_MASTER_DATA_EDIT")
  return {
    type: ActionTypes.GET_MASTER_DATA_EDIT,
    payload:  master
  }
}