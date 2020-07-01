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
  console.log("save configuration")
  console.log(data)
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
  console.log("USR DATA")
  console.log(data)
  const auth = {
    username: data.user,
    password: data.password
  }

  console.log("GET LOGIN")
  // return axios.put(`${url}/master/login`,{},
  return axios.put(`${url}/master/auth`,{},
                    {
                      httpsAgent: httsAgent,
                      auth: auth
                    }
                  )
    .then(resp => {
      console.log(resp.data)
      return resp.data
    })
    .catch(resp => {
      console.log(resp)
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
      console.log(resp.data)
      return resp.data
    })
    .catch(resp => {
      console.log(resp)
      return resp.data
    })
}

function getAbout(data) {
  console.log("USR DATA")
  console.log(data)
  console.log("GET LOGIN")
  // return axios.put(`${url}/master/login`,{},
  return axios.get(`${url}/home`,
                    {
                      httpsAgent: httsAgent
                    }
                  )
    .then(resp => {
      console.log(resp.data)
      return resp.data
    })
    .catch(resp => {
      console.log(resp)
      return resp.data
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

  return axios.get(`${url}/node/GetAllNodes2`,
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
  getLogin,
  getAbout,
  getConfiguration,
  setConfiguration,
  setPassword,
  getNodes
}