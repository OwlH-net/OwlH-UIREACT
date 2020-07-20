import * as ActionTypes from './login-action-types';

export function getMasterDataToEdit(master) {
  return {
    type: ActionTypes.GET_MASTER_DATA_EDIT,
    payload: master
  }
}

export function loginSetActiveMaster(master) {
  return {
    type: ActionTypes.LOGIN_SET_ACTIVE_MASTER,
    payload: master
  }
}