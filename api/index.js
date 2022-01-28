const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const Spots = require('./routes/spots')

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
   console.log(err)
   process.exit(1)
})

app.use(express.json())
app.use(cors())

app.use('/api/v1/spots', Spots)

const PORT = process.env.PORT || 8800

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))