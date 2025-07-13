const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Property = require('../models/Property');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/properties/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'property-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// @route   GET /api/properties
// @desc    Get all properties with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('minPrice').optional().isNumeric().withMessage('Min price must be a number'),
  query('maxPrice').optional().isNumeric().withMessage('Max price must be a number'),
  query('city').optional().trim(),
  query('propertyType').optional().isIn(['apartment', 'bedspace', 'dorm', 'house', 'condo']),
  query('bedrooms').optional().isInt({ min: 0 }).withMessage('Bedrooms must be a non-negative integer'),
  query('bathrooms').optional().isInt({ min: 0 }).withMessage('Bathrooms must be a non-negative integer'),
  query('latitude').optional().isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
  query('longitude').optional().isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
  query('radius').optional().isFloat({ min: 0 }).withMessage('Radius must be positive')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 12,
      minPrice,
      maxPrice,
      city,
      propertyType,
      bedrooms,
      bathrooms,
      furnished,
      wifi,
      aircon,
      parking,
      nearMRT,
      petFriendly,
      search,
      latitude,
      longitude,
      radius = 10, // km
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {
      status: 'active',
      'availability.isAvailable': true
    };

    // Price filtering
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Location filtering
    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    // Property type filtering
    if (propertyType) {
      query.propertyType = propertyType;
    }

    // Specs filtering
    if (bedrooms) {
      query['specs.bedrooms'] = { $gte: Number(bedrooms) };
    }
    if (bathrooms) {
      query['specs.bathrooms'] = { $gte: Number(bathrooms) };
    }

    // Amenities filtering
    if (furnished === 'true') query['amenities.furnished'] = true;
    if (wifi === 'true') query['amenities.wifi'] = true;
    if (aircon === 'true') query['amenities.aircon'] = true;
    if (parking === 'true') query['amenities.parking'] = true;
    if (nearMRT === 'true') query['amenities.nearMRT'] = true;
    if (petFriendly === 'true') query['amenities.petFriendly'] = true;

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Geospatial search
    if (latitude && longitude) {
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)]
          },
          $maxDistance: Number(radius) * 1000 // Convert km to meters
        }
      };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    const [properties, totalCount] = await Promise.all([
      Property.find(query)
        .populate('landlord', 'firstName lastName avatar phone email')
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit)),
      Property.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / Number(limit));

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalCount,
          hasNextPage: Number(page) < totalPages,
          hasPrevPage: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching properties'
    });
  }
});

// @route   GET /api/properties/:id
// @desc    Get single property by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('landlord', 'firstName lastName avatar phone email');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Increment view count
    property.views += 1;
    await property.save();

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Get property error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid property ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching property'
    });
  }
});

// @route   POST /api/properties
// @desc    Create new property
// @access  Private (Landlords only)
router.post('/', [
  auth,
  authorize('landlord', 'admin'),
  upload.array('images', 10),
  // Validation middleware
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be less than 100 characters'),
  body('description').trim().isLength({ min: 1, max: 2000 }).withMessage('Description is required and must be less than 2000 characters'),
  body('propertyType').isIn(['apartment', 'bedspace', 'dorm', 'house', 'condo']).withMessage('Invalid property type'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('location.address').trim().notEmpty().withMessage('Address is required'),
  body('location.city').trim().notEmpty().withMessage('City is required'),
  body('location.province').trim().notEmpty().withMessage('Province is required'),
  body('location.zipCode').trim().notEmpty().withMessage('Zip code is required'),
  body('location.coordinates.latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
  body('location.coordinates.longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
  body('availability.availableFrom').isISO8601().withMessage('Available from date is required'),
  body('contactInfo.phone').matches(/^(\+63|0)[0-9]{10}$/).withMessage('Valid phone number is required'),
  body('contactInfo.email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Process uploaded images
    const images = req.files ? req.files.map(file => ({
      url: `/uploads/properties/${file.filename}`,
      caption: ''
    })) : [];

    const propertyData = {
      ...req.body,
      landlord: req.user._id,
      images
    };

    const property = new Property(propertyData);
    await property.save();

    await property.populate('landlord', 'firstName lastName avatar phone email');

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating property'
    });
  }
});

// @route   PUT /api/properties/:id
// @desc    Update property
// @access  Private (Owner or Admin only)
router.put('/:id', [
  auth,
  upload.array('images', 10)
], async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership or admin role
    if (property.landlord.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    // Process new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: `/uploads/properties/${file.filename}`,
        caption: ''
      }));
      req.body.images = [...(property.images || []), ...newImages];
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('landlord', 'firstName lastName avatar phone email');

    res.json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperty
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating property'
    });
  }
});

// @route   DELETE /api/properties/:id
// @desc    Delete property
// @access  Private (Owner or Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership or admin role
    if (property.landlord.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting property'
    });
  }
});

// @route   GET /api/properties/user/:userId
// @desc    Get properties by user (landlord's properties)
// @access  Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [properties, totalCount] = await Promise.all([
      Property.find({ landlord: req.params.userId })
        .populate('landlord', 'firstName lastName avatar phone email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Property.countDocuments({ landlord: req.params.userId })
    ]);

    const totalPages = Math.ceil(totalCount / Number(limit));

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalCount,
          hasNextPage: Number(page) < totalPages,
          hasPrevPage: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get user properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user properties'
    });
  }
});

module.exports = router;
