'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

interface School {
  _id: string;
  name: string;
  location: string;
  cutOffMark: number;
  courses: string[];
}

type FilterOption = 'name' | 'location' | 'cutOffMark' | 'courses';

function ExplorePage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState<FilterOption>('name');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`);
        const data = await res.json();
        setSchools(data);
        setFilteredSchools(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = schools.filter((school) => {
      if (filterBy === 'name') return school.name.toLowerCase().includes(lowerSearch);
      if (filterBy === 'location') return school.location.toLowerCase().includes(lowerSearch);
      if (filterBy === 'cutOffMark') return school.cutOffMark >= Number(search);
      if (filterBy === 'courses') return school.courses.some(course => course.toLowerCase().includes(lowerSearch));
      return true;
    });

    setFilteredSchools(filtered);
  }, [search, filterBy, schools]);

  const handleView = (id: string) => {
    window.location.href = `/school/${id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-24 px-4 sm:px-6">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-800">Explore Schools</h1>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder={`Search by ${filterBy}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterOption)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="cutOffMark">Cut-off Mark</option>
            <option value="courses">Courses</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading schools...</p>
        ) : filteredSchools.length === 0 ? (
          <p className="text-center text-lg text-red-500">No schools found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <div
                key={school._id}
                className="bg-white border border-gray-100 rounded-2xl shadow hover:shadow-lg transition duration-300"
              >
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-blue-900">{school.name}</h3>
                  <p className="text-gray-600">📍 {school.location}</p>
                  <p className="text-sm text-gray-500">🎯 Cut-off Mark: <strong>{school.cutOffMark}</strong></p>

                  <button
                    onClick={() => handleView(school._id)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
