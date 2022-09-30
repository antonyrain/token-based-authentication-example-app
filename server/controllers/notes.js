const { info, error } =require('../utils/logger')
const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Note = require('../models/noteSchema')
const User = require('../models/userSchema')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    } 
    return null 
}
  
notesRouter.get('/', async (req, res) => {
   await Note.find({}).then(notes => {
        res.json(notes)
    })
})

notesRouter.get('/:id', async (req, res) => {
    await Note.findById(req.params.id).then(note => {
        res.json(note)
    })
})

notesRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        const token = getTokenFrom(req)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({error: 'token missin or invalid'})
        }
        
        await User.findById(decodedToken.id)

        const note = new Note({
            content: body.content,
            required: true,
        })

        await note.save().then(savedNote => {
            res.json(savedNote)
        })
    } catch (error) {
        info('token missing')
    }
})

module.exports = notesRouter