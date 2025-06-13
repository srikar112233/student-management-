const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

app.put('/students/:id', async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(Server running at http://localhost:${PORT}));