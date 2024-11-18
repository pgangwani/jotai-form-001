import React from 'react';
import { Link } from 'react-router-dom';
import { Beaker, TestTube } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Form Management with Jotai
        </h1>
        <p className="text-lg text-gray-600">
          Explore practical examples of form handling using Jotai
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Link
          to="/basic"
          className="block group"
        >
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Beaker className="w-6 h-6 text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Basic Form</h2>
            </div>
            <p className="text-gray-600">
              Learn the fundamentals of form handling with a simple registration form example
            </p>
          </div>
        </Link>

        <Link
          to="/advanced"
          className="block group"
        >
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <TestTube className="w-6 h-6 text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Advanced Form</h2>
            </div>
            <p className="text-gray-600">
              Explore complex form patterns with dynamic fields and advanced validation
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}