const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const app = express()

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const connectDB = require('./database/connectDB')
connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app