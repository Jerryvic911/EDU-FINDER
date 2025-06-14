'use client';
import React, { useState } from 'react';

export default function AddSchoolPage() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    schoolFees: '',
    cutOffMark: '',
    hasPostUtme: false,
    aboutSchool: '',
    accommodation: {
      hostel: '',
      feeding: '',
    },
    courses: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;

  if (type === 'checkbox') {
    const target = e.target as HTMLInputElement; // 👈 Narrow the type
    setFormData((prev) => ({
      ...prev,
      [name]: target.checked,
    }));
  } else if (name === 'hostel' || name === 'feeding') {
    setFormData((prev) => ({
      ...prev,
      accommodation: {
        ...prev.accommodation,
        [name]: Number(value),
      },
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        ...formData,
        schoolFees: Number(formData.schoolFees),
        cutOffMark: Number(formData.cutOffMark),
        accommodation: {
          hostel: Number(formData.accommodation.hostel),
          feeding: Number(formData.accommodation.feeding),
        },
        courses: formData.courses.split(',').map((course) => course.trim()),
      };

      const token = localStorage.getItem('token');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('School added successfully!');
        setFormData({
          name: '',
          location: '',
          schoolFees: '',
          cutOffMark: '',
          hasPostUtme: false,
          aboutSchool: '',
          accommodation: { hostel: '', feeding: '' },
          courses: '',
        });
      } else {
        const error = await res.json();
        setMessage(error.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Add a New School</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="School Name" className="w-full p-2 border rounded" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" required />
        <input name="schoolFees" type="number" value={formData.schoolFees} onChange={handleChange} placeholder="School Fees" className="w-full p-2 border rounded" required />
        <input name="cutOffMark" type="number" value={formData.cutOffMark} onChange={handleChange} placeholder="Cut-Off Mark" className="w-full p-2 border rounded" required />
        <textarea name="aboutSchool" value={formData.aboutSchool} onChange={handleChange} placeholder="About the school" className="w-full p-2 border rounded" required />
        
        <div className="flex items-center space-x-2">
          <input name="hasPostUtme" type="checkbox" checked={formData.hasPostUtme} onChange={handleChange} />
          <label htmlFor="hasPostUtme">Has Post UTME</label>
        </div>

        <input name="hostel" type="number" value={formData.accommodation.hostel} onChange={handleChange} placeholder="Hostel Fee" className="w-full p-2 border rounded" required />
        <input name="feeding" type="number" value={formData.accommodation.feeding} onChange={handleChange} placeholder="Feeding Fee" className="w-full p-2 border rounded" required />

        <input name="courses" value={formData.courses} onChange={handleChange} placeholder="Courses (comma separated)" className="w-full p-2 border rounded" required />

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {loading ? 'Submitting...' : 'Add School'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
