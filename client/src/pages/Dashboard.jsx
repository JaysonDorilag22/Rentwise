import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FiHome, 
  FiPlus, 
  FiEye, 
  FiHeart, 
  FiUser, 
  FiSettings,
  FiBarChart,
  FiMapPin
} from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();

  const tenantStats = [
    { 
      title: 'Saved Properties', 
      value: '12', 
      icon: FiHeart, 
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    { 
      title: 'Recent Views', 
      value: '45', 
      icon: FiEye, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    { 
      title: 'Searches', 
      value: '23', 
      icon: FiMapPin, 
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
  ];

  const landlordStats = [
    { 
      title: 'Active Listings', 
      value: '8', 
      icon: FiHome, 
      color: 'text-primary-500',
      bgColor: 'bg-primary-100 dark:bg-primary-900/20'
    },
    { 
      title: 'Total Views', 
      value: '234', 
      icon: FiEye, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    { 
      title: 'Inquiries', 
      value: '15', 
      icon: FiUser, 
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
  ];

  const quickActions = user?.role === 'landlord' ? [
    {
      title: 'Add New Property',
      description: 'List a new rental property',
      icon: FiPlus,
      link: '/add-property',
      color: 'bg-primary-600 hover:bg-primary-700'
    },
    {
      title: 'View Properties',
      description: 'Manage your listings',
      icon: FiHome,
      link: '/properties?landlord=me',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Analytics',
      description: 'View performance insights',
      icon: FiBarChart,
      link: '/insights',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
  ] : [
    {
      title: 'Browse Properties',
      description: 'Find your perfect rental',
      icon: FiHome,
      link: '/properties',
      color: 'bg-primary-600 hover:bg-primary-700'
    },
    {
      title: 'Saved Properties',
      description: 'View your favorites',
      icon: FiHeart,
      link: '/saved-properties',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      title: 'Market Insights',
      description: 'Explore rent trends',
      icon: FiBarChart,
      link: '/insights',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
  ];

  const currentStats = user?.role === 'landlord' ? landlordStats : tenantStats;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {user?.role === 'landlord' 
              ? 'Manage your properties and track their performance'
              : 'Find your perfect rental property'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white p-6 rounded-lg shadow-sm transition-colors block`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-6 h-6" />
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Properties */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user?.role === 'landlord' ? 'Recent Listings' : 'Recently Viewed'}
              </h2>
              <Link
                to="/properties"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {/* Placeholder for recent properties */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Modern 2BR Apartment in BGC
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Taguig City • ₱25,000/month
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile
              </h2>
              <Link
                to="/profile"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Edit
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>📧 {user?.email}</p>
                <p>📱 {user?.phone}</p>
              </div>
              <div className="pt-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"
                >
                  <FiSettings className="w-4 h-4" />
                  <span>Account Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
