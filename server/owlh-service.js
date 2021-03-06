const axios = require('axios')
const https = require('https');
const fs = require('fs');
const configFile = 'server/etc/config.json'

let url = ''
let config

let httsAgent = new https.Agent({ rejectUnauthorized: false });

function readConfiguration() {
  let rawdata = fs.readFileSync(configFile);
  config = JSON.parse(rawdata);
  
  config.map(master => {
    if (master.active) {
      baseUrl = `https://${master.ip}:${master.port}`
    }
  })

  const recurso = '/v1'
  url = `${baseUrl}${recurso}`
}

readConfiguration()

function saveConfiguration(data) {
  configuration = JSON.stringify(data);
  fs.writeFileSync(configFile, configuration);
  readConfiguration()
}

function getConfiguration() {
  return config
}

function setConfiguration(data) {
  saveConfiguration(data)
}

function getLogin(data) {
  const auth = {
    username: data.user,
    password: data.password
  }

  return axios.put(`${url}/master/auth`,{},
                    {
                      httpsAgent: httsAgent,
                      auth: auth
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function AddOrganization(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.put(`${url}/master/addOrganization`,req.body,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function EditOrganization(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.put(`${url}/node/editOrganization`,req.body,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function saveNewFileContent(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.put(`${url}/master/saveNewFileContent`,req.body,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function SyncGroupRulesets(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.put(`${url}/node/ruleset/syncGroups`,req.body,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function setPassword(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.put(`${url}/master/changePassword`,req.body,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function getAbout(data) {
  return axios.get(`${url}/home`,
                    {
                      httpsAgent: httsAgent
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(error => {
      return {ack: "false", error: error.errno, code: error.code}
    })
}

function getNodes(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.get(`${url}/node/getAllNodesReact`,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function getTags(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.get(`${url}/node/getAllTags`,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function DeleteNodeGroup(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.delete(`${url}/group/deleteNodeGroup/${req.params.uuid}`,
                  {
                    httpsAgent: httsAgent,
                     headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function deleteNode(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.delete(`${url}/node/${req.params.uuid}`,
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function DeleteExpertGroupRuleset(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.delete(`${url}/group/deleteExpertGroupRuleset`, 
                  {
                    data:req.body,
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function regNode(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/node/registerNode/${req.params.uuid}`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function AddRulesetsToGroup(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/group/addRulesetsToGroup`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function SyncPathGroup(req) {
  console.log(req.body);
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }

  return axios.post(`${url}/group/syncPathGroup`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function enrollNode(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }

  return axios.post(`${url}/node/enrollNewNode`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function getGroups(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.get(`${url}/group`,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function editNode(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/node/updateNodeReact`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function editGroup(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/group/editGroup`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function AddGroupNodes(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/group/addGroupNodes`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function AnalyzerStatus(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/node/analyzer`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function SyncAnalyzer(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/node/analyzer/sync`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function SyncAllSuricataGroup(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/group/syncAllSuricataGroup`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function ChangeSuricataStatus(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/node/ChangeServiceStatus`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function GetMD5files(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/group/getMD5files`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function ChangePaths(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/group/changePaths`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function GetFileContent(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }
  return axios.put(`${url}/master/getFileContentByType`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function addGroup(req) {
  let newHeader = {
    'Content-Type': 'application/json',
    'token': req.headers.token,
    'user': req.headers.user
  }

  return axios.post(`${url}/group`,req.body, 
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function deleteGroup(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.delete(`${url}/group/DeleteGroup/${req.params.uuid}`,
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

function GetAllOrganizationNodes(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.get(`${url}/master/getAllOrganizationNodes/${req.params.uuid}`,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function AllNodesGroup(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.get(`${url}/group/getAllNodesGroup/${req.params.uuid}`,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function GetGroupSuricataList(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.get(`${url}/group/suricata/status/${req.params.uuid}`,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function GetGroupSelectedRulesets(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.get(`${url}/group/getGroupSelectedRulesets/${req.params.uuid}`,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function GetAllOrganizations(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.get(`${url}/node/getAllOrganizations`,
                    {
                      httpsAgent: httsAgent,
                      headers: newHeader
                    }
                  )
    .then(resp => {
      return resp.data
    })
    .catch(resp => {
      return resp.data
    })
}

function DeleteOrg(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.delete(`${url}/node/deleteOrg/${req.params.uuid}`,
                  {
                    httpsAgent: httsAgent,
                    headers: newHeader
                  }
                )
  .then(resp => {
    return resp.data
  })
  .catch(resp => {
    return resp.data
  })
}

module.exports = {
  enrollNode,
  DeleteOrg,
  GetGroupSuricataList,
  AllNodesGroup,
  getLogin,
  getAbout,
  getConfiguration,
  setConfiguration,
  setPassword,
  getNodes,
  deleteNode,
  regNode,
  getGroups,
  editNode,
  addGroup,
  deleteGroup,
  editGroup,
  AddGroupNodes,
  DeleteNodeGroup,
  AnalyzerStatus,
  ChangeSuricataStatus,
  SyncAnalyzer,
  ChangePaths,
  GetMD5files,
  GetGroupSelectedRulesets,
  DeleteExpertGroupRuleset,
  AddRulesetsToGroup,
  SyncPathGroup,
  SyncGroupRulesets,
  GetFileContent,
  SyncAllSuricataGroup,
  saveNewFileContent,
  getTags,
  GetAllOrganizations,
  EditOrganization,
  AddOrganization,
  GetAllOrganizationNodes,
}