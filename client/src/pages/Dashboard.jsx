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
      bgColor: 'bg-red-100'
    },
    { 
      title: 'Recent Views', 
      value: '45', 
      icon: FiEye, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    { 
      title: 'Applications', 
      value: '3', 
      icon: FiUser, 
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    }
  ];

  const landlordStats = [
    { 
      title: 'My Properties', 
      value: '8', 
      icon: FiHome, 
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      title: 'Total Views', 
      value: '234', 
      icon: FiEye, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    { 
      title: 'Applications', 
      value: '15', 
      icon: FiUser, 
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    }
  ];

  const currentStats = user?.role === 'landlord' ? landlordStats : tenantStats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'landlord' 
              ? 'Manage your properties and track applications'
              : 'Find your perfect rental property'
            }
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {user?.role === 'landlord' ? (
              <>
                <Link
                  to="/add-property"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
                >
                  <FiPlus className="mr-2" />
                  Add New Property
                </Link>
                <Link
                  to="/insights"
                  className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center"
                >
                  <FiBarChart className="mr-2" />
                  View Insights
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/properties"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
                >
                  <FiHome className="mr-2" />
                  Browse Properties
                </Link>
                <Link
                  to="/profile"
                  className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center"
                >
                  <FiUser className="mr-2" />
                  Update Profile
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Links
            </h2>
            <div className="space-y-3">
              {user?.role === 'landlord' ? (
                <>
                  <Link to="/add-property" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center">
                      <FiPlus className="text-green-600 mr-3" />
                      <span className="font-medium">Add New Property</span>
                    </div>
                  </Link>
                  <Link to="/insights" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center">
                      <FiBarChart className="text-green-600 mr-3" />
                      <span className="font-medium">Market Insights</span>
                    </div>
                  </Link>
                  <Link to="/profile" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center">
                      <FiSettings className="text-green-600 mr-3" />
                      <span className="font-medium">Account Settings</span>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/properties" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center">
                      <FiHome className="text-green-600 mr-3" />
                      <span className="font-medium">Browse Properties</span>
                    </div>
                  </Link>
                  <Link to="/insights" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center">
                      <FiBarChart className="text-green-600 mr-3" />
                      <span className="font-medium">Market Insights</span>
                    </div>
                  </Link>
                  <Link to="/profile" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center">
                      <FiUser className="text-green-600 mr-3" />
                      <span className="font-medium">My Profile</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h2>
            </div>
            <div className="space-y-4">
              {user?.role === 'landlord' ? (
                <>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0"></div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        New application received
                      </h3>
                      <p className="text-xs text-gray-500">
                        2-bedroom apartment • 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0"></div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Property viewed 15 times
                      </h3>
                      <p className="text-xs text-gray-500">
                        Studio apartment • 1 day ago
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0"></div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Saved new property
                      </h3>
                      <p className="text-xs text-gray-500">
                        2-bedroom apartment • 3 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0"></div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Application submitted
                      </h3>
                      <p className="text-xs text-gray-500">
                        Studio apartment • 2 days ago
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
