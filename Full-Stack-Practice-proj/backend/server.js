import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

let students = [
  { id: 1, name: "Ali", email: "ali@gmail.com", course: "Math" },
  { id: 2, name: "Sara", email: "sara@gmail.com", course: "Science" },
  { id: 3, name: "John", email: "raheem@gmail.com", course: "History" },
];

// get all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// home route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management API");
});

// add a new student
app.post("/api/students", (req, res) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    email,
    course,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
