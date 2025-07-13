import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <FiHome className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>
        
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/properties"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Browse Properties
            </Link>
            <Link
              to="/insights"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Market Insights
            </Link>
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
