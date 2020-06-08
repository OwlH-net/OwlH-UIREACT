const express = require('express')
const OwlHService = require('./owlh-service')

const router = express.Router()

router.get('/', async (req, res, next) => {
  console.log('GET CONFIG')
  const config = await OwlHService.getConfiguration()
  res.status(200).json(config)
})

router.put('/', async (req, res, next) => {
  console.log('SAVE CONFIG')
  const config = await OwlHService.setConfiguration(req.body)
  res.status(200).json(config)
})

module.exports = router