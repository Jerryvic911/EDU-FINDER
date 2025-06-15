export const dynamic = 'force-dynamic';

import Navbar from '@/app/components/Navbar';
import React from 'react';

interface School {
  _id: string;
  name: string;
  location: string;
  aboutSchool: string;
  cutOffMark: number;
  schoolFees: number;
  accommodation?: {
    hostel: number;
    feeding: number;
  };
  courses?: string[];
  hasPostUtme: boolean;
}

async function getSchool(id: string): Promise<School> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch school');
  }

  return res.json();
}

export default async function SchoolDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const school = await getSchool(params.id);

  return (
    <div className="min-h-screen px-4 pt-20 pb-12 bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2">{school.name}</h1>
        <p className="text-gray-600 mb-1 text-lg">📍 {school.location}</p>
        <p className="text-gray-700 mt-4 mb-6 leading-relaxed">{school.aboutSchool}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Cut-off Mark</p>
            <p className="text-xl font-semibold text-blue-800">{school.cutOffMark}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">School Fees</p>
            <p className="text-xl font-semibold text-green-800">₦{school.schoolFees}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Hostel</p>
            <p className="text-xl font-semibold text-yellow-800">₦{school.accommodation?.hostel}</p>
          </div>
          <div className="bg-pink-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Feeding</p>
            <p className="text-xl font-semibold text-pink-800">₦{school.accommodation?.feeding}</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-xl col-span-1 sm:col-span-2">
            <p className="text-sm text-gray-600 mb-2">Courses Offered</p>
            <ul className="list-disc list-inside text-base font-medium text-indigo-800 space-y-1">
              {Array.isArray(school.courses) && school.courses.length > 0 ? (
                school.courses.map((course, index) => <li key={index}>{course}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>

          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Post-UTME Required</p>
            <p className="text-lg font-semibold text-gray-800">
              {school.hasPostUtme ? '✅ Yes' : '❌ No'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
