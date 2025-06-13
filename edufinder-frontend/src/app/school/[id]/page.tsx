import React from 'react';

interface Props {
  params: { id: string };
}

async function getSchool(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${id}`);
  if (!res.ok) {
    throw new Error('School not found');
  }
  return res.json();
}

export default async function SchoolDetailPage({ params }: Props) {
  const school = await getSchool(params.id);

  return (
    <div className="p-6 min-h-screen bg-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{school.name}</h1>
      <p className="text-lg text-gray-700 mb-2"><strong>Location:</strong> {school.location}</p>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">About School</h2>
        <p className="text-gray-600">{school.aboutSchool || 'No information available.'}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">School Fees</h2>
        <p className="text-gray-700">₦{school.schoolFees.toLocaleString()}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Accommodation</h2>
        <p className="text-gray-700">
          Hostel: ₦{school.accommodation?.hostel?.toLocaleString() || 0}
        </p>
        <p className="text-gray-700">
          Feeding: ₦{school.accommodation?.feeding?.toLocaleString() || 0}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Courses Offered</h2>
        <ul className="list-disc list-inside text-gray-700">
          {school.courses?.map((course: string, index: number) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Admission Info</h2>
        <p className="text-gray-700">
          Cut-Off Mark: <strong>{school.cutOffMark}</strong>
        </p>
        <p className="text-gray-700">
          Post-UTME: <strong>{school.hasPostUtme ? 'Yes' : 'No'}</strong>
        </p>
      </div>
    </div>
  );
}
