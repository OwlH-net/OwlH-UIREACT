const express = require('express')
const OwlHService = require('./owlh-service')

const router = express.Router()


// router.get('/login', async (req, res, next) => {
//   console.log('GET')
//   console.log(req.body)
//   const login = await OwlHService.getLogin(req.body)
//   console.log(login)
//   res.status(200).json(login)
// })
router.put('/login', async (req, res, next) => {
  const login = await OwlHService.getLogin(req.body)
  res.status(200).json(login)
})

router.get('/about', async (req, res, next) => {
  const about = await OwlHService.getAbout(req.body)
  res.status(200).json(about)
})

router.put('/pass', async (req, res, next) => {
  const pass = await OwlHService.setPassword(req)
  res.status(200).json(pass)
})

router.get('/nodes', async (req, res, next) => {
  const nodes = await OwlHService.getNodes(req)
  res.status(200).json(nodes)
})

// router.get('/pingNode/:uuid', async (req, res, next) => {
//   const ping = await OwlHService.pingNode(req)
//   res.status(200).json(ping)
// })

router.delete('/deleteNode/:uuid', async (req, res, next) => {
  const del = await OwlHService.deleteNode(req)
  res.status(200).json(del)
})

router.delete('/deleteGroup/:uuid', async (req, res, next) => {
  const del = await OwlHService.deleteGroup(req)
  res.status(200).json(del)
})

router.delete('/deleteNodeGroup/:uuid', async (req, res, next) => {
  const del = await OwlHService.DeleteNodeGroup(req)
  res.status(200).json(del)
})

router.put('/registerNode/:uuid', async (req, res, next) => {
  const reg = await OwlHService.regNode(req)
  res.status(200).json(reg)
})

router.put('/editGroup', async (req, res, next) => {
  const reg = await OwlHService.editGroup(req)
  res.status(200).json(reg)
})

router.post('/enrollNode', async (req, res, next) => {
  const reg = await OwlHService.enrollNode(req)
  res.status(200).json(reg)
})

router.post('/group', async (req, res, next) => {
  const reg = await OwlHService.addGroup(req)
  res.status(200).json(reg)
})

router.get('/groups', async (req, res, next) => {
  const reg = await OwlHService.getGroups(req)
  res.status(200).json(reg)
})

router.get('/groups', async (req, res, next) => {
  const reg = await OwlHService.getGroups(req)
  res.status(200).json(reg)
})

router.put('/editNode', async (req, res, next) => {
  const reg = await OwlHService.editNode(req)
  res.status(200).json(reg)
})

router.put('/addGroupNodes', async (req, res, next) => {
  const reg = await OwlHService.AddGroupNodes(req)
  res.status(200).json(reg)
})

router.get('/getAllNodesGroup/:uuid', async (req, res, next) => {
  const ping = await OwlHService.AllNodesGroup(req)
  res.status(200).json(ping)
})

router.get('/getGroupSuricataList/:uuid', async (req, res, next) => {
  const ping = await OwlHService.GetGroupSuricataList(req)
  res.status(200).json(ping)
})

router.put('/analyzer', async (req, res, next) => {
  const reg = await OwlHService.AnalyzerStatus(req)
  res.status(200).json(reg)
})

router.put('/syncAnalyzerData', async (req, res, next) => {
  const reg = await OwlHService.SyncAnalyzer(req)
  res.status(200).json(reg)
})

router.put('/changeSuricataStatus', async (req, res, next) => {
  const reg = await OwlHService.ChangeSuricataStatus(req)
  res.status(200).json(reg)
})

router.put('/changePaths', async (req, res, next) => {
  const reg = await OwlHService.ChangePaths(req)
  res.status(200).json(reg)
})

router.put('/getMD5files', async (req, res, next) => {
  const reg = await OwlHService.GetMD5files(req)
  res.status(200).json(reg)
})

module.exports = router