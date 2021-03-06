const NodeGeocoder = require('node-geocoder')
const dotenv = require('dotenv')

dotenv.config()

const options = {
   provider: process.env.GEOCODER_PROVIDER,
   httpAdapter: 'https',
   apiKey: process.env.GEOCODER_API,
   formatter: null
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder