'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  schoolId: string;
}

export default function DeleteSchoolButton({ schoolId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this school?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${schoolId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert('School deleted successfully');
        router.push('/admin'); // or '/explore'
      } else {
        const errorData = await res.json();
        alert(`Failed to delete: ${errorData.message || res.statusText}`);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred while deleting');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
    >
      Delete School
    </button>
  );
}
