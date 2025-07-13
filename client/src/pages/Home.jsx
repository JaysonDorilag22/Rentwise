import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiTrendingUp, FiUsers, FiHome, FiStar } from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: FiSearch,
      title: 'Smart Search',
      description: 'Find your perfect rental with advanced filters and intelligent matching.',
    },
    {
      icon: FiMapPin,
      title: 'Map Integration',
      description: 'Explore properties on an interactive map with neighborhood insights.',
    },
    {
      icon: FiTrendingUp,
      title: 'Market Insights',
      description: 'Get real-time rent trends and pricing analytics for better decisions.',
    },
    {
      icon: FiUsers,
      title: 'Trusted Community',
      description: 'Connect with verified landlords and tenants in a secure environment.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Properties Listed' },
    { number: '5,000+', label: 'Happy Tenants' },
    { number: '2,000+', label: 'Verified Landlords' },
    { number: '50+', label: 'Cities Covered' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-500 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Your Perfect
              <span className="block text-green-100">Rental Home</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50 max-w-3xl mx-auto">
              Discover apartments, bedspaces, and dorms across the Philippines with RentWise. 
              Your trusted partner in finding the perfect rental property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to="/properties"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors inline-flex items-center justify-center shadow-lg"
              >
                <FiSearch className="w-5 h-5 mr-2" />
                Browse Properties
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center"
              >
                <FiHome className="w-5 h-5 mr-2" />
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RentWise?
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              We provide the most comprehensive and user-friendly platform for rental properties in the Philippines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-background-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with RentWise is simple and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-float shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search & Filter
              </h3>
              <p className="text-gray-600">
                Use our advanced search filters to find properties that match your preferences and budget.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-float shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                View & Compare
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse detailed property listings with photos, amenities, and location information.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Connect & Rent
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Contact verified landlords directly and secure your perfect rental property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied tenants and landlords who trust RentWise for their rental needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Start Searching
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Santos',
                role: 'Tenant',
                content: 'RentWise helped me find the perfect apartment in BGC. The search filters made it so easy to find exactly what I was looking for.',
              },
              {
                name: 'John Rodriguez',
                role: 'Landlord',
                content: 'As a property owner, RentWise has been incredible for managing my listings and connecting with quality tenants.',
              },
              {
                name: 'Sarah Chen',
                role: 'Student',
                content: 'Found an amazing bedspace near my university through RentWise. The platform is user-friendly and reliable.',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "{testimonial.content}"
                </p>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
