import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span>RentWise</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner in finding the perfect rental property in the Philippines. 
              Connecting renters and landlords with modern, efficient, and secure solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/properties"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Market Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Join as Landlord
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Join as Tenant
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">support@rentwise.ph</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+63 (2) 8123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Metro Manila, Philippines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Property Types */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Popular Property Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link
              to="/properties?propertyType=apartment"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Apartments
            </Link>
            <Link
              to="/properties?propertyType=bedspace"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Bedspaces
            </Link>
            <Link
              to="/properties?propertyType=dorm"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dormitories
            </Link>
            <Link
              to="/properties?propertyType=house"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Houses
            </Link>
            <Link
              to="/properties?propertyType=condo"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Condominiums
            </Link>
          </div>
        </div>

        {/* Popular Cities */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              'Manila',
              'Quezon City',
              'Makati',
              'Taguig',
              'Pasig',
              'Mandaluyong',
              'Pasay',
              'Paranaque',
              'Muntinlupa',
              'Las Piñas',
              'Marikina',
              'Caloocan'
            ].map((city) => (
              <Link
                key={city}
                to={`/properties?city=${city}`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            <p>&copy; 2025 RentWise. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/help"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
