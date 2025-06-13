import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentManagementSystem = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', rollNo: '', grade: '', attendance: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', rollNo: '', grade: '', attendance: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/students');
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await axios.post('http://localhost:5000/students', form);
    setForm({ name: '', rollNo: '', grade: '', attendance: '' });
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(http://localhost:5000/students/${id});
    fetchStudents();
  };

  const startEdit = (student) => {
    setEditId(student._id);
    setEditForm(student);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(http://localhost:5000/students/${editId}, editForm);
    setEditId(null);
    fetchStudents();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Student Management System</h1>

      {/* Add New Student */}
      <div className="space-y-2 mb-6">
        <input className="w-full p-2 border" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
        <input className="w-full p-2 border" placeholder="Roll No" name="rollNo" value={form.rollNo} onChange={handleChange} />
        <input className="w-full p-2 border" placeholder="Grade" name="grade" value={form.grade} onChange={handleChange} />
        <input className="w-full p-2 border" placeholder="Attendance" name="attendance" value={form.attendance} onChange={handleChange} />
        <button className="bg-blue-600 text-white px-4 py-2" onClick={handleAdd}>Add Student</button>
      </div>

      {/* Student List */}
      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student._id} className="border p-4 rounded shadow">
            {editId === student._id ? (
              <div className="space-y-2">
                <input className="w-full p-2 border" name="name" value={editForm.name} onChange={handleEditChange} />
                <input className="w-full p-2 border" name="rollNo" value={editForm.rollNo} onChange={handleEditChange} />
                <input className="w-full p-2 border" name="grade" value={editForm.grade} onChange={handleEditChange} />
                <input className="w-full p-2 border" name="attendance" value={editForm.attendance} onChange={handleEditChange} />
                <button className="bg-green-600 text-white px-3 py-1 mr-2" onClick={handleUpdate}>Update</button>
                <button className="bg-gray-400 px-3 py-1" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll No:</strong> {student.rollNo}</p>
                <p><strong>Grade:</strong> {student.grade}</p>
                <p><strong>Attendance:</strong> {student.attendance}%</p>
                <button className="bg-yellow-500 text-white px-3 py-1 mr-2" onClick={() => startEdit(student)}>Edit</button>
                <button className="bg-red-600 text-white px-3 py-1" onClick={() => handleDelete(student._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManagementSystem;