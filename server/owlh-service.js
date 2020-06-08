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
  console.log(config["master"]);

  const baseUrl = `https://${config["master"]}:${config["port"]}`
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

function trySave() {
  let configuration = {
      "master":"195.45.31.219",
      "port":"50003"
  };
  saveConfiguration(configuration)
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