import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.set('strictQuery',false)

const companySchema = new mongoose.Schema({
  company: String,
  location: String,
  industry: String,
  applied: Boolean,
  description: String
})

const Company = mongoose.model('Company', companySchema)

// const note = new Note({
//   company: "gogoDuck",
//   location: "Boston",
//   industry: "SaaS",
//   applied: false,
//   description: "N/A"
// })

app.get("/note", async (req, res) => {
  try {
    const companies = await Company.find({});
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/note", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.json(savedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});