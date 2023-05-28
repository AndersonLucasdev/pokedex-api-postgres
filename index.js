const express = require('express')
const pool = require('./src/database/db')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.listen(3000)