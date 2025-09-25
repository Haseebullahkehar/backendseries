import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', course: '' });

  useEffect(() => {
    axios.get("/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/students', form);
      setStudents([...students, res.data]);
      setForm({ name: '', email: '', course: '' });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎓 Student Details Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
        />
        <button type="submit">Add Student</button>
      </form>

      <h2>All Students</h2>
      {students.map((s) => (
        <div key={s.id}>
          <p>
            <b>{s.name}</b> ({s.email}) – {s.course}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
