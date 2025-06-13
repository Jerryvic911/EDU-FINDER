'use client';
import React from 'react';
import Image from 'next/image';
import school from '../image/school.jpg';
import { Book, LocateFixed, School2, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold uppercase leading-tight">
            Decide your future with EduFinder
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Our site helps you find top universities and schools in Nigeria based on your course and preferences.
          </p>
          <button className="mt-6 px-6 py-2 bg-black rounded-md text-white hover:bg-white hover:text-black transition">
            Get Started
          </button>
        </div>
        <div className="hidden md:block">
          <Image
            src={school}
            alt="landing-page-image"
            className="rounded-xl shadow-lg h-[300px] w-auto object-cover"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Book className="mx-auto text-blue-600" size={40} />
            <h3 className="font-semibold mt-4">Search Schools</h3>
            <p className="text-gray-500 mt-2">Find schools by name, location, or course.</p>
          </div>
          <div>
            <LocateFixed className="mx-auto text-blue-600" size={40} />
            <h3 className="font-semibold mt-4">Filter & Compare</h3>
            <p className="text-gray-500 mt-2">Use smart filters to match your needs.</p>
          </div>
          <div>
            <School2 className="mx-auto text-blue-600" size={40} />
            <h3 className="font-semibold mt-4">Get Details</h3>
            <p className="text-gray-500 mt-2">View fees, courses, and accommodation options.</p>
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="py-12 px-4 md:px-20 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Schools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="bg-gray-100 rounded-xl p-6 shadow hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-2">University of Ibadan</h3>
              <p className="text-sm text-gray-600">Ibadan, Oyo State</p>
              <p className="text-sm mt-2">Accommodation: ✅ | Post-UTME Fee: ₦2000</p>
              <button className="mt-4 text-blue-600 hover:underline flex items-center gap-1">
                View Details <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-700 text-white text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to explore Nigerian schools?</h2>
        <p className="text-lg mb-6">Start your journey with EduFinder now.</p>
        <button className="px-8 py-2 bg-white text-blue-700 font-semibold rounded-md hover:bg-blue-100 transition">
          Explore Now
        </button>
      </section>

      {/* Footer */}
    <Footer/>
    </div>
  );
}

export default LandingPage;
