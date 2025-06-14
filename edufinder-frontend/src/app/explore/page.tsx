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

function ExplorePage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState<'name' | 'location' | 'cutOffMark' | 'courses'>('name');

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
      if (filterBy === 'name') {
        return school.name.toLowerCase().includes(lowerSearch);
      }
      if (filterBy === 'location') {
        return school.location.toLowerCase().includes(lowerSearch);
      }
      if (filterBy === 'cutOffMark') {
        return school.cutOffMark >= Number(search); // return those >= entered score
      }
        if (filterBy === 'courses') {
        return school.courses.some(course => course.toLowerCase().includes(lowerSearch));
      }
      return true;
    });

    setFilteredSchools(filtered);
  }, [search, filterBy, schools]);

  const handleView = (id: string) => {
    window.location.href = `/school/${id}`;
  };

  return (
    <div className="p-6 mt-10 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div>
        <Navbar/>
      </div>
      <h1 className="text-4xl font-bold mb-6">Explore Schools</h1>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder={`Search by ${filterBy}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
        />

        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="cutOffMark">Cut-off Mark</option>
           <option value="courses">Courses</option>
        </select>
      </div>

      {loading ? (
        <p>Loading schools...</p>
      ) : filteredSchools.length === 0 ? (
        <p>No schools found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold">{school.name}</h3>
                <p className="text-gray-500">{school.location}</p>
                <p className="text-gray-500 text-sm">Cut-off Mark: {school.cutOffMark}</p>
                <button
                  onClick={() => handleView(school._id)}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExplorePage;
