const express = require('express');
const Property = require('../models/Property');

const router = express.Router();

// @route   GET /api/insights/rent-trends
// @desc    Get rent trends and statistics
// @access  Public
router.get('/rent-trends', async (req, res) => {
  try {
    const { city, propertyType } = req.query;

    // Build match conditions
    const matchConditions = {
      status: 'active',
      'availability.isAvailable': true
    };

    if (city) {
      matchConditions['location.city'] = new RegExp(city, 'i');
    }

    if (propertyType) {
      matchConditions.propertyType = propertyType;
    }

    // Aggregate rent statistics
    const rentStats = await Property.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: null,
          averageRent: { $avg: '$price' },
          minRent: { $min: '$price' },
          maxRent: { $max: '$price' },
          totalProperties: { $sum: 1 },
          averageArea: { $avg: '$specs.area' }
        }
      }
    ]);

    // Get rent by property type
    const rentByType = await Property.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: '$propertyType',
          averageRent: { $avg: '$price' },
          count: { $sum: 1 },
          minRent: { $min: '$price' },
          maxRent: { $max: '$price' }
        }
      },
      { $sort: { averageRent: -1 } }
    ]);

    // Get rent by city (top 10)
    const rentByCity = await Property.aggregate([
      { $match: { status: 'active', 'availability.isAvailable': true } },
      {
        $group: {
          _id: '$location.city',
          averageRent: { $avg: '$price' },
          count: { $sum: 1 },
          minRent: { $min: '$price' },
          maxRent: { $max: '$price' }
        }
      },
      { $match: { count: { $gte: 3 } } }, // Only cities with at least 3 properties
      { $sort: { averageRent: -1 } },
      { $limit: 10 }
    ]);

    // Calculate average cost per square meter
    const costPerSqmStats = await Property.aggregate([
      { 
        $match: {
          ...matchConditions,
          'specs.area': { $gt: 0 }
        }
      },
      {
        $addFields: {
          costPerSqm: { $divide: ['$price', '$specs.area'] }
        }
      },
      {
        $group: {
          _id: null,
          averageCostPerSqm: { $avg: '$costPerSqm' },
          minCostPerSqm: { $min: '$costPerSqm' },
          maxCostPerSqm: { $max: '$costPerSqm' }
        }
      }
    ]);

    // Get popular amenities
    const amenityStats = await Property.aggregate([
      { $match: matchConditions },
      {
        $project: {
          amenities: { $objectToArray: '$amenities' }
        }
      },
      { $unwind: '$amenities' },
      { $match: { 'amenities.v': true } },
      {
        $group: {
          _id: '$amenities.k',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: rentStats[0] || {
          averageRent: 0,
          minRent: 0,
          maxRent: 0,
          totalProperties: 0,
          averageArea: 0
        },
        rentByType,
        rentByCity,
        costPerSqm: costPerSqmStats[0] || {
          averageCostPerSqm: 0,
          minCostPerSqm: 0,
          maxCostPerSqm: 0
        },
        popularAmenities: amenityStats
      }
    });
  } catch (error) {
    console.error('Get rent trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching rent trends'
    });
  }
});

// @route   GET /api/insights/property-stats
// @desc    Get property statistics for dashboard
// @access  Public
router.get('/property-stats', async (req, res) => {
  try {
    // Total properties by status
    const propertyStatusStats = await Property.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Properties added in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentProperties = await Property.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
      status: 'active'
    });

    // Most viewed properties
    const mostViewed = await Property.find({ status: 'active' })
      .populate('landlord', 'firstName lastName')
      .sort({ views: -1 })
      .limit(5)
      .select('title price location.city views images');

    // Properties by price range
    const priceRanges = [
      { range: '0-10000', min: 0, max: 10000 },
      { range: '10001-20000', min: 10001, max: 20000 },
      { range: '20001-30000', min: 20001, max: 30000 },
      { range: '30001-50000', min: 30001, max: 50000 },
      { range: '50000+', min: 50001, max: Infinity }
    ];

    const priceDistribution = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Property.countDocuments({
          status: 'active',
          price: { 
            $gte: range.min, 
            $lte: range.max === Infinity ? Number.MAX_SAFE_INTEGER : range.max 
          }
        });
        return { range: range.range, count };
      })
    );

    res.json({
      success: true,
      data: {
        propertyStatusStats,
        recentProperties,
        mostViewed,
        priceDistribution
      }
    });
  } catch (error) {
    console.error('Get property stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching property statistics'
    });
  }
});

module.exports = router;
