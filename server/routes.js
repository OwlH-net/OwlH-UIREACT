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
  const login = await OwlHService.getAbout(req.body)
  res.status(200).json(login)
})

router.put('/pass', async (req, res, next) => {
  const pass = await OwlHService.setPassword(req)
  res.status(200).json(pass)
})

router.get('/nodes', async (req, res, next) => {
  const pass = await OwlHService.getNodes(req)
  res.status(200).json(pass)
})

router.get('/pingNode/:uuid', async (req, res, next) => {
  const pass = await OwlHService.pingNode(req)
  res.status(200).json(pass)
})

module.exports = router