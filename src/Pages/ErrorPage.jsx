import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <h1 className="text-7xl font-bold text-green-600 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-success text-white px-6">Go Back Home</Link>
    </div>
  );
}