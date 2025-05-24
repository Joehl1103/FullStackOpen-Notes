const mongoose = require('mongoose')

mongoose.set('stringQuery',false)
const url = process.env.MONGODB_URI

console.log('connecting to ',url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB',error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

noteSchema.set('toJson',{
    transform: (document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Note',noteSchema)