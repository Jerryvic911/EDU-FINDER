import React from 'react';

interface Props {
  params: { id: string };
}

async function getSchool(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch school');
  }

  return res.json();
}

export default async function SchoolDetailPage({ params }: Props) {
  // ✅ THIS IS OK NOW
  const school = await getSchool(params.id);

  return (
    <div className="p-6 min-h-screen bg-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{school.name}</h1>
      <p className="text-gray-600 mb-2">{school.location}</p>
      <p className="mb-4">{school.aboutSchool}</p>

      <div className="grid grid-cols-2 gap-4">
        <p><strong>Cut Off Mark:</strong> {school.cutOffMark}</p>
        <p><strong>School Fees:</strong> ₦{school.schoolFees}</p>
        <p><strong>Hostel:</strong> ₦{school.accommodation?.hostel}</p>
        <p><strong>Feeding:</strong> ₦{school.accommodation?.feeding}</p>
        <p><strong>Courses:</strong> {school.courses?.join(', ')}</p>
        <p><strong>Has Post-UTME:</strong> {school.hasPostUtme ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
