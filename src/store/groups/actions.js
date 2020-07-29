import * as ActionTypes from './group-action-types';
import {GetUserName, GetToken} from '../../components/Shared/CheckToken'
import { ToggleProgressBar, AddAlertToAlertList, toggleAlert } from '../webUtilities/actions'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function GetGroupSuricataList(groupID) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.get('/api/getGroupSuricataList/'+groupID, newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(accGetGroupSuricataList(resp.data))
    })
  }
}
function accGetGroupSuricataList(data) {
  return {
    type: ActionTypes.GET_ALL_SURICATA_GROUP,
    payload: data
  }
}

export function GetAllGroups() {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.get('/api/groups', newConfig)
      .then(resp => {
        
        dispatch(ToggleProgressBar(false))

        if(resp.data.ack != "true"){
          dispatch(AddAlertToAlertList({
            id: new Date() / 1000+'-valid',
            title: "Error getting groups! ",
            subtitle: "Error getting Groups - "+resp.data.error,
            variant: "danger"
          }))
          dispatch(toggleAlert(true))
        }else{
          dispatch(accGetAllGroups(resp.data))
        }
      })
    }
}
function accGetAllGroups(data) {
    return {
      type: ActionTypes.GET_ALL_GROUPS,
      payload: data
    }
}

export function AddGroup(data) {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.post('/api/group', JSON.stringify(data), newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))
        dispatch(GetAllGroups())
      })
    }
}

export function CheckMD5(data) {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.put('/api/getMD5files', JSON.stringify(data), newConfig)
      .then(resp => {
        dispatch(accCheckMD5(resp.data))
      })
    }
}
export function accCheckMD5(data) {
  return {
    type: ActionTypes.GET_MD5_FILES,
    payload: data
  }
}

export function ChangeSuricataConfigGroupPaths(data) {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.put('/api/changePaths', JSON.stringify(data), newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))
        dispatch(HidePathInput())
        dispatch(GetAllGroups())
      })
    }
}

export function EditGroupSelected(data) {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.put('/api/editGroup', JSON.stringify(data), newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))
        dispatch(GetAllGroups())
      })
    }
}

export function ShowPathInput() {
    return {
      type: ActionTypes.SHOW_PATH_INPUT
    }
}

export function HidePathInput() {
    return {
      type: ActionTypes.HIDE_PATH_INPUT
    }
}

export function ShowGroupForm() {
    return {
      type: ActionTypes.DISPLAY_FORM_GROUP
    }
}

export function SaveGroupSelected(data) {
    return {
      type: ActionTypes.SAVE_EDIT_FORM,
      payload: data
    }
}

export function GroupToDetails(data) {
    return {
      type: ActionTypes.GROUP_TO_DETAILS,
      payload: data
    }
}

export function CloseGroupForm() {
    return {
      type: ActionTypes.CLEAR_EDIT_FORM
    }
}

export function ShowEditForm() {
    return {
      type: ActionTypes.SHOW_EDIT_FORM
    }
}

export function DeleteGroup(nodeUUID) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.delete('/api/deleteGroup/'+nodeUUID, newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(GetAllGroups())
    })
  }
}

export function ShowNodesGroupForm(guuid) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.get('/api/getAllNodesGroup/'+guuid, newConfig)
    .then(resp => {
      dispatch(accShowNodesGroupForm(resp.data))
      dispatch(ToggleProgressBar(false))
    })
  }
}
function accShowNodesGroupForm(data) {
  return {
    type: ActionTypes.GET_NODES_GROUP,
    payload: data
  }
}

export function HideAllNodesGroup() {
  return {
    type: ActionTypes.HIDE_EDIT_FORM
  }
}

export function DisplayAddRulesetForm(data) {
  return {
    type: ActionTypes.DISPLAY_RULESET_LIST,
    payload: data
  }
}

export function GetRulesetList(guuid) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.get('/api/getGroupSelectedRulesets/'+guuid, newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(accGetRulesetList(resp.data))
    })
  }
}
export function accGetRulesetList(data) {
  return {
    type: ActionTypes.GET_RULESET_LIST,
    payload: data
  }
}

export function AddNodesToGroup(data) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.put('/api/addGroupNodes', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(HideAllNodesGroup())
      dispatch(GetAllGroups())
    })
  }
}

export function AnalyzerStatus(data) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.put('/api/analyzer', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(GetAllGroups())
    })
  }
}

export function ChangeSuricataStatus(data) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.put('/api/changeSuricataStatus', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(GetAllGroups())
    })
  }
}

export function SyncAnalyzer(data) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.put('/api/syncAnalyzerData', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(GetAllGroups())
    })
  }
}

export function DeleteGroupNode(nodeUUID) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.delete('/api/deleteNodeGroup/'+nodeUUID, newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(GetAllGroups())
    })
  }
}

export function DeleteRulesetSelected(values) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.delete('/api/deleteExpertGroupRuleset', {data:JSON.stringify(values), headers: newHeaders})
    .then(resp => {
      // if(resp.data.ack == "true"){
        dispatch(ToggleProgressBar(false))
        dispatch(GetRulesetList(values.uuid))
      // }else{

      // }
    })
  }
}

export function AddRulesetsToGroup(data) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.put('/api/addRulesetsToGroup', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(DisplayAddRulesetForm(false))
      dispatch(GetRulesetList(data.uuid))
    })
  }
}