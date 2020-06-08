const express = require('express')
const OwlHService = require('./owlh-service')

const router = express.Router()


router.get('/', async (req, res, next) => {
  console.log('GET')
  console.log(req.body)
  const login = await OwlHService.getLogin(req.body)
  console.log(login)
  res.status(200).json(login)
})

router.put('/', async (req, res, next) => {
  console.log('GET')
  console.log(req.body)
  const login = await OwlHService.getLogin(req.body)
  console.log(login)
  res.status(200).json(login)
})

module.exports = router