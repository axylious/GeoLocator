const router = require('express').Router()
const {getSpots, addSpot} = require('../controllers/spots')

router
   .route('/')
   .get(getSpots)
   .post(addSpot)

module.exports = router