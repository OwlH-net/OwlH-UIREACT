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
console.log(url)

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

  // return axios.put(`${url}/master/login`,{},
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
      console.log(resp.data.Nodes)
      return resp.data.Nodes
    })
    .catch(resp => {
      return resp.data
    })
}

function pingNode(req) {
  let token = req.headers.token
  let username = req.headers.user

  let newHeader = {
    'Content-Type': 'application/json',
    'token': token,
    'user': username
  }

  return axios.get(`${url}/node/ping/${req.params.uuid}`,
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
  console.log(req.headers)
  console.log(`${url}/node/${req.params.uuid}`)
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
  return axios.put(`${url}/node`,req.body, 
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

module.exports = {
  enrollNode,
  getLogin,
  getAbout,
  getConfiguration,
  setConfiguration,
  setPassword,
  getNodes,
  pingNode,
  deleteNode,
  regNode,
  getGroups,
  editNode,
  addGroup,
  deleteGroup,
  editGroup
}