/*global require*/

const express = require('express')
const cors  = require('cors')

const app = express()
app.use(cors())
app.use(express.static('dist'))

/* JSON Parsers
takes the JSON data of a request, transforms it into a JS object and then attaches it to the body property of the request object
*/
app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(request, response)=> {
  response.send('server/dist/assets/index-OAzzoRJh.js')
})

app.get('/api/notes',(request,response) => {
  response.json(notes)
})

app.get('/api/notes/:id',(request,response) => {
  const id = request.params.id // this is tied dynamically to the data that is 'sent' 
  const note = notes.find(note => note.id === id)
  if (note){
    response.json(note)
  } else {
    response.status(404).send("Note does not exist") // override the default
  }
})
const generateId= () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
    return String(maxId + 1)
}
app.post('/api/notes',(request,response) => {

  const body = request.body

  // the body must have content
  if (!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // since the body has content, construct the notes object
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  notes = notes.concat(note)

  console.log(note)
  response.json(note)
})

app.delete('/api/notes/:id',(request,response) =>{
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
