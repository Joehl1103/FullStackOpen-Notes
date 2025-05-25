/*global require*/

require('dotenv').config()
const express = require('express')
const cors  = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')


// Express settings
const app = express()
app.use(cors())
app.use(express.static('dist'))


/* JSON Parsers
takes the JSON data of a request, transforms it into a JS object and then attaches it to the body property of the request object

*/
app.use(express.json())

 async function getCollections(){
      const collections = await mongoose.connection.listCollections()
      console.log("Collections:",collections)
    }

// Root
app.get('/',(request, response)=> {
  response.send('server/dist/assets/index-OAzzoRJh.js')
})

// Fetch All
app.get('/api/notes',(request,response) => {
  console.log('finding notes')

  Note.find({}).then(notes => {
    response.json(notes)
    notes.forEach(note => {
      console.log(note)
    })
  })
  // .catch(error => {
  //   next(err)
  // })
})

// Get note by Id
app.get('/api/notes/:id',(request,response,next) => {
  Note.findById(request.params.id)
    .then(note =>{
      if (note) {
        console.log(note.toJSON())
        response.json(note)
      } else {
        response.status(404).end()
      }
  })
  .catch(error => next(error))
})

app.post('/api/notes',(request,response) => {

  const body = request.body

  // the body must have content
  if (!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // since the body has content, construct the notes object
  const note =  new Note({
    content: body.content,
    important: body.important || false
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

//Delete Note
app.delete('/api/notes/:id',(request,response,next) =>{
  const id = request.params.id
  Note.findByIdAndDelete(id)
    .then(result => {
      // check if a resources was actually deleted and return different status codes for two cases
      console.log("result",result)
      if (!result){
        response.status(404).end()
      }
      response.status(204).end()
    
    })
    .catch(error => next(error))
})

const errorHandler = (error,request,response,next)=>{
  console.error("error message: ",error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformed id'})
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
