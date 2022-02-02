const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const SpotSchema = new mongoose.Schema({
   locName: {
      type: String,
      required: [true, 'Please add a location name'],
      unique: true,
      trim: true,
      maxlength: [64, 'Location name must be less than 64 characters'],
   },
   address: {
      type: String,
      required: [true, 'Please add an Address']
   },
   location: {
      type:{ 
         type: String,
         enum: ['Point'],
      },
      coordinates: {
         type: [Number],
         index: '2dsphere'
      },
      formattedAddress: String,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   }
})

SpotSchema.pre('save', async function(next) {
   const loc = await geocoder.geocode(this.address)
   this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
   }

   this.address = undefined
   next()
})

module.exports = mongoose.model('Spot', SpotSchema)