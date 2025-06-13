'use client';
import React, { useEffect, useState } from 'react';

interface School {
  name: string;
  location: string;
  _id: string;
}

function ExplorePage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`);
        const data = await res.json();

        console.log('Fetched schools:', data);
        setSchools(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const handleView = (id: string) => {
    window.location.href = `/school/${id}`;
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-4xl font-bold mb-4">Explore Schools</h1>

      {loading ? (
        <p>Loading schools...</p>
      ) : schools.length === 0 ? (
        <p>No schools found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold">{school.name}</h3>
                <p className="text-gray-500">{school.location}</p>
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
