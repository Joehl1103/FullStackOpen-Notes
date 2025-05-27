const notesRouter = require('express').Router()
const Note = require('./models/note')

// Fetch All
notesRouter.get('/',(request,response) => {
    console.log('finding notes')

    Note.find({})
        .then(notes => {
            response.json(notes)
            notes.forEach(note => {
                console.log(note)
            })
        })
})

notesRouter.get('/:id',(request,response,next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                console.log(note.toJSON())
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

notesRouter.post('/',(request,response,next) => {

    const body = request.body

    // the body must have content
    if (!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note =  new Note({
        content: body.content,
        important: body.important || false
    })
    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
})

notesRouter.put('/:id',(request,response,next) => {
    const { content,important } = request.body
    console.log(`Note with content ${content} and of importance ${important} has id ${request.params.id}`)

    Note.findById(request.params.id)
        .then(note => {
            if(!note){
                return response.status(404).end()
            }

            note.content = content
            note.important = important

            return note.save().then((updatedNote => {
                response.json(updatedNote)
            }))
        })
        .catch(error => next(error))
})

//Delete Note
notesRouter.delete('/:id',(request,response,next) => {
    const id = request.params.id
    console.log(`id ${id} of type ${typeof id}`)
    Note.findByIdAndDelete(id)
        .then(result => {
        // check if a resources was actually deleted and return different status codes for two cases
            console.log('result',result)
            if (!result){
                response.status(404).end()
            }
            response.status(204).end()
        })
        .catch(error => next(error))
})

module.exports = notesRouter