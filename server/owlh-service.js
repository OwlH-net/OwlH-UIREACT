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
  console.log(config["master"]);

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
    username: data.usr,
    password: data.pass
  }

  console.log("GET LOGIN")
  return axios.put(`${url}/master/login`,{},
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

module.exports = {
  getLogin,
  getConfiguration,
  setConfiguration
}