import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBarChart, FiTrendingUp, FiHome, FiMapPin, FiStar } from 'react-icons/fi';

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    city: '',
    propertyType: ''
  });

  useEffect(() => {
    fetchInsights();
    fetchStats();
  }, [filters]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.propertyType) params.append('propertyType', filters.propertyType);
      
      const response = await axios.get(`/api/insights/rent-trends?${params}`);
      setInsights(response.data.data);
    } catch (err) {
      setError('Failed to fetch insights data');
      console.error('Insights fetch error:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/insights/property-stats');
      setStats(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch statistics');
      console.error('Stats fetch error:', err);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Market Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover rental market trends and statistics across the Philippines
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type
              </label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condominium</option>
                <option value="bedspace">Bedspace</option>
                <option value="dorm">Dormitory</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        {insights && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <FiTrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₱{insights.overview.averageRent?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <FiHome className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Properties</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {insights.overview.totalProperties?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FiBarChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Price Range</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₱{insights.overview.minRent?.toLocaleString() || '0'} - ₱{insights.overview.maxRent?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <FiMapPin className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Area</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {insights.overview.averageArea?.toFixed(0) || '0'} sqm
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rent by Property Type */}
          {insights?.rentByType && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Average Rent by Property Type
              </h3>
              <div className="space-y-4">
                {insights.rentByType.map((item) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {item._id}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.count} properties
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        ₱{item.averageRent?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ₱{item.minRent?.toLocaleString()} - ₱{item.maxRent?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rent by City */}
          {insights?.rentByCity && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Cities by Average Rent
              </h3>
              <div className="space-y-4">
                {insights.rentByCity.map((item, index) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item._id}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.count} properties
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        ₱{item.averageRent?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Amenities */}
          {insights?.popularAmenities && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Popular Amenities
              </h3>
              <div className="space-y-3">
                {insights.popularAmenities.slice(0, 10).map((amenity) => (
                  <div key={amenity._id} className="flex items-center justify-between">
                    <p className="text-sm text-gray-900 dark:text-white capitalize">
                      {amenity._id.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ 
                            width: `${(amenity.count / insights.popularAmenities[0].count) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {amenity.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cost per Square Meter */}
          {insights?.costPerSqm && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Cost per Square Meter
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Average</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ₱{insights.costPerSqm.averageCostPerSqm?.toFixed(0)}/sqm
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Range</span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    ₱{insights.costPerSqm.minCostPerSqm?.toFixed(0)} - ₱{insights.costPerSqm.maxCostPerSqm?.toFixed(0)}/sqm
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Property Statistics */}
        {stats && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Platform Statistics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Most Viewed Properties */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Most Viewed Properties
                </h3>
                <div className="space-y-4">
                  {stats.mostViewed?.map((property, index) => (
                    <div key={property._id} className="flex items-center space-x-3">
                      <span className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {property.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {property.location?.city} • ₱{property.price?.toLocaleString()}/month
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <FiStar className="w-4 h-4" />
                        <span className="text-sm">{property.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Distribution */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Price Distribution
                </h3>
                <div className="space-y-3">
                  {stats.priceDistribution?.map((range) => (
                    <div key={range.range} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-white">
                        ₱{range.range}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ 
                              width: `${(range.count / Math.max(...stats.priceDistribution.map(r => r.count))) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                          {range.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;