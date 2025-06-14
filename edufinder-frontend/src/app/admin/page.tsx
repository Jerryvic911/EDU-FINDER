'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface School {
  _id: string;
  name: string;
  location: string;
  cutOffMark: number;
  schoolFees: number;
}

export default function AdminDashboard() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSchools = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`);
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error('Error fetching schools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this school?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSchools((prev) => prev.filter((school) => school._id !== id));
        alert('School deleted');
      } else {
        const errorData = await res.json();
        alert(`Delete failed: ${errorData.message || res.statusText}`);
      }
    } catch (err) {
      console.error('Error deleting school:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <button
        onClick={() => router.push('/admin/addSchool')}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add School
      </button>

      {loading ? (
        <p>Loading schools...</p>
      ) : (
        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Location</th>
              <th className="border px-4 py-2 text-left">Cutoff</th>
              <th className="border px-4 py-2 text-left">Fees (₦)</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school._id}>
                <td className="border px-4 py-2">{school.name}</td>
                <td className="border px-4 py-2">{school.location}</td>
                <td className="border px-4 py-2">{school.cutOffMark}</td>
                <td className="border px-4 py-2">{school.schoolFees}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => router.push(`/admin/edit/${school._id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(school._id)}
                    className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
