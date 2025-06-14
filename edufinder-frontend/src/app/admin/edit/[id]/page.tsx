'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface School {
  _id: string;
  name: string;
  location: string;
  aboutSchool: string;
  cutOffMark: number;
  schoolFees: number;
  accommodation: {
    hostel: number;
    feeding: number;
  };
  courses: string[];
  hasPostUtme: boolean;
}

export default function EditSchoolPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [school, setSchool] = useState<School | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!id) return;

    const fetchSchool = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${id}`);
      const data = await res.json();
      setSchool(data);
    };

    fetchSchool();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setSchool((prev) =>
      prev ? {
        ...prev,
        [name]: name === 'cutOffMark' || name === 'schoolFees' ? Number(value) : value
      } : null
    );
  };

  const handleAccommodationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchool((prev) =>
      prev
        ? {
            ...prev,
            accommodation: {
              ...prev.accommodation,
              [name]: Number(value),
            },
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(school),
      });

      if (res.ok) {
        alert('School updated successfully!');
        router.push('/admin'); // go back to dashboard
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (!school) return <p>Loading school data...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg mt-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Edit School</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={school.name} onChange={handleChange} className="input" required />
        <input name="location" value={school.location} onChange={handleChange} className="input" required />
        <textarea name="aboutSchool" value={school.aboutSchool} onChange={handleChange} className="input" rows={3} />
        <input name="cutOffMark" type="number" value={school.cutOffMark} onChange={handleChange} className="input" />
        <input name="schoolFees" type="number" value={school.schoolFees} onChange={handleChange} className="input" />

        <div className="flex gap-4">
          <input name="hostel" type="number" value={school.accommodation.hostel} onChange={handleAccommodationChange} className="input" />
          <input name="feeding" type="number" value={school.accommodation.feeding} onChange={handleAccommodationChange} className="input" />
        </div>

        <input
          name="courses"
          type="text"
          value={school.courses.join(', ')}
          onChange={(e) =>
            setSchool((prev) => prev ? { ...prev, courses: e.target.value.split(',').map(c => c.trim()) } : null)
          }
          className="input"
          placeholder="Courses separated by commas"
        />

        <label className="block">
          <input
            type="checkbox"
            checked={school.hasPostUtme}
            onChange={(e) =>
              setSchool((prev) => prev ? { ...prev, hasPostUtme: e.target.checked } : null)
            }
            className="mr-2"
          />
          Has Post-UTME?
        </label>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
      </form>
    </div>
  );
}
