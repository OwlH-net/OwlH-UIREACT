const express = require('express')
const OwlHService = require('./owlh-service')

const router = express.Router()

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

router.put('/saveNewFileContent', async (req, res, next) => {
  const pass = await OwlHService.saveNewFileContent(req)
  res.status(200).json(pass)
})

router.get('/nodes', async (req, res, next) => {
  const nodes = await OwlHService.getNodes(req)
  res.status(200).json(nodes)
})

router.get('/tags', async (req, res, next) => {
  const tags = await OwlHService.getTags(req)
  res.status(200).json(tags)
})

router.delete('/deleteExpertGroupRuleset', async (req, res, next) => {
  const del = await OwlHService.DeleteExpertGroupRuleset(req)
  res.status(200).json(del)
})

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

router.post('/syncPathGroup', async (req, res, next) => {
  const reg = await OwlHService.SyncPathGroup(req)
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

router.get('/getAllOrganizations/:uuid', async (req, res, next) => {
  const ping = await OwlHService.GetAllOrganizationNodes(req)
  res.status(200).json(ping)
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

router.put('/addRulesetsToGroup', async (req, res, next) => {
  const reg = await OwlHService.AddRulesetsToGroup(req)
  res.status(200).json(reg)
})

router.put('/syncGroupRulesets', async (req, res, next) => {
  const reg = await OwlHService.SyncGroupRulesets(req)
  res.status(200).json(reg)
})

router.put('/getFileContent', async (req, res, next) => {
  const reg = await OwlHService.GetFileContent(req)
  res.status(200).json(reg)
})

router.put('/syncAllSuricataGroup', async (req, res, next) => {
  const reg = await OwlHService.SyncAllSuricataGroup(req)
  res.status(200).json(reg)
})

router.put('/editOrganization', async (req, res, next) => {
  const reg = await OwlHService.EditOrganization(req)
  res.status(200).json(reg)
})

router.get('/getGroupSelectedRulesets/:uuid', async (req, res, next) => {
  const ping = await OwlHService.GetGroupSelectedRulesets(req)
  res.status(200).json(ping)
})

router.get('/getAllOrganizations', async (req, res, next) => {
  const ping = await OwlHService.GetAllOrganizations(req)
  res.status(200).json(ping)
})

router.delete('/deleteOrg/:uuid', async (req, res, next) => {
  const del = await OwlHService.DeleteOrg(req)
  res.status(200).json(del)
})

router.put('/addOrganization', async (req, res, next) => {
  const reg = await OwlHService.AddOrganization(req)
  res.status(200).json(reg)
})


module.exports = router