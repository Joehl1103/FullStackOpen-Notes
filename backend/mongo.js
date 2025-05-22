const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jkhloomis:${password}@cluster0.z1gftkf.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url).then()

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note',noteSchema)

const note1 = new Note({
    content: "HTML is easy",
    important: true
})

const note2 = new Note({
    content: "CSS is easy",
    important: false
})

const note3 = new Note({
    content: "JS is not easy",
    important: true
})

const note4 = new Note({
    content: "Java is 'interesting'",
    important: false
})

const noteArray = [note1,note2,note3,note4]


noteArray.forEach(note =>{
    note.save().then(result => {
    console.log('note saved!')
    })
})

mongoose.connection.close()
