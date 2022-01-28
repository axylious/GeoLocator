const Spot = require('../models/Spot')

// Create spot
exports.addSpot = async (req, res, next) => {
   try {
      const spot = await Spot.create(req.body)

      res.status(200).json({
         success: true,
         data: spot,
      })
   } catch(err) {
      console.log(err)
      if(err.code === 11000) {
         return res.status(400).json({error: 'This spot already exists'})
      }
      res.status(500).json({error: 'Server Error'})
   }
}

// Get all spots
exports.getSpots = async (req, res, next) => {
   try {
      const spots = await Spot.find()

      return res.status(200).json({
         success: true,
         count: spots.length,
         data: spots
      })
   } catch(err) {
      console.log(err)
      res.status(500).json({error: 'Server Error'})
   }
}