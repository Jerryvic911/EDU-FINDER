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
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchSchools = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`);
      const data = await res.json();
      setSchools(data);
      setFilteredSchools(data);
    } catch (err) {
      console.error('Error fetching schools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    const searchLower = search.toLowerCase();
    const filtered = schools.filter(
      (school) =>
        school.name.toLowerCase().includes(searchLower) ||
        school.location.toLowerCase().includes(searchLower)
    );
    setFilteredSchools(filtered);
  }, [search, schools]);

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
        const updated = schools.filter((school) => school._id !== id);
        setSchools(updated);
        setFilteredSchools(updated);
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => router.push('/admin/addSchool')}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          + Add School
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or location..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {loading ? (
        <p className="text-gray-600">Loading schools...</p>
      ) : filteredSchools.length === 0 ? (
        <p className="text-gray-500 text-center">No schools found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm sm:text-base">
              <tr>
                <th className="border px-4 py-3 text-left">Name</th>
                <th className="border px-4 py-3 text-left">Location</th>
                <th className="border px-4 py-3 text-left">Cutoff</th>
                <th className="border px-4 py-3 text-left">Fees (₦)</th>
                <th className="border px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.map((school) => (
                <tr key={school._id} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-3">{school.name}</td>
                  <td className="border px-4 py-3">{school.location}</td>
                  <td className="border px-4 py-3">{school.cutOffMark}</td>
                  <td className="border px-4 py-3">{school.schoolFees.toLocaleString()}</td>
                  <td className="border px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => router.push(`/admin/edit/${school._id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(school._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
