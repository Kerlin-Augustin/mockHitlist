import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = // enter mongo URI string with password var in place of the actual password

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  company: String,
  location: String,
  industry: String,
  applied: Boolean,
  description: String
})

const Note = mongoose.model('Company', noteSchema)

const note = new Note({
  company: "OurSpark",
  location: "Boston",
  industry: "SaaS",
  applied: true,
  description: "Videos"
})

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })