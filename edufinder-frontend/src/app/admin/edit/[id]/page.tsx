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
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!id) return;
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchSchool = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Unauthorized or Not Found');

        const data = await res.json();
        setSchool(data);
      } catch (err) {
        console.error(err);
        router.push('/unauthorized');
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [id, router, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSchool((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === 'cutOffMark' || name === 'schoolFees' ? Number(value) : value,
          }
        : null
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
        router.push('/admin');
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (loading) return <p className="text-center mt-10">Checking authentication...</p>;
  if (!school) return <p className="text-center mt-10">School not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">Edit School Details</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <input
          name="name"
          value={school.name}
          onChange={handleChange}
          placeholder="School Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          name="location"
          value={school.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          name="aboutSchool"
          value={school.aboutSchool}
          onChange={handleChange}
          placeholder="About the School"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="cutOffMark"
            type="number"
            value={school.cutOffMark}
            onChange={handleChange}
            placeholder="Cut-off Mark"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="schoolFees"
            type="number"
            value={school.schoolFees}
            onChange={handleChange}
            placeholder="School Fees"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="hostel"
            type="number"
            value={school.accommodation.hostel}
            onChange={handleAccommodationChange}
            placeholder="Hostel Fee"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="feeding"
            type="number"
            value={school.accommodation.feeding}
            onChange={handleAccommodationChange}
            placeholder="Feeding Fee"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <input
          name="courses"
          type="text"
          value={school.courses.join(', ')}
          onChange={(e) =>
            setSchool((prev) =>
              prev ? { ...prev, courses: e.target.value.split(',').map((c) => c.trim()) } : null
            )
          }
          placeholder="Courses (comma separated)"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={school.hasPostUtme}
            onChange={(e) =>
              setSchool((prev) => (prev ? { ...prev, hasPostUtme: e.target.checked } : null))
            }
            className="h-5 w-5 text-blue-600"
          />
          <span className="text-sm text-gray-700">Has Post-UTME?</span>
        </label>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
