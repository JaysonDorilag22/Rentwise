const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Property = require('../models/Property');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('savedProperties', 'title price location images propertyType');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  auth,
  body('firstName').optional().trim().isLength({ min: 1, max: 50 }),
  body('lastName').optional().trim().isLength({ min: 1, max: 50 }),
  body('phone').optional().matches(/^(\+63|0)[0-9]{10}$/),
  body('preferences.location').optional().trim(),
  body('preferences.budgetRange.min').optional().isNumeric(),
  body('preferences.budgetRange.max').optional().isNumeric(),
  body('preferences.propertyType').optional().isIn(['apartment', 'bedspace', 'dorm', 'house', 'condo'])
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

    const allowedUpdates = [
      'firstName', 
      'lastName', 
      'phone', 
      'avatar', 
      'preferences'
    ];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   POST /api/users/save-property/:propertyId
// @desc    Save/unsave a property to user's favorites
// @access  Private
router.post('/save-property/:propertyId', auth, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    
    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const user = await User.findById(req.user._id);
    const isAlreadySaved = user.savedProperties.includes(propertyId);

    if (isAlreadySaved) {
      // Remove from saved properties
      user.savedProperties = user.savedProperties.filter(
        id => id.toString() !== propertyId
      );
      await user.save();

      res.json({
        success: true,
        message: 'Property removed from favorites',
        isSaved: false
      });
    } else {
      // Add to saved properties
      user.savedProperties.push(propertyId);
      await user.save();

      res.json({
        success: true,
        message: 'Property saved to favorites',
        isSaved: true
      });
    }
  } catch (error) {
    console.error('Save property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving property'
    });
  }
});

// @route   GET /api/users/saved-properties
// @desc    Get user's saved properties
// @access  Private
router.get('/saved-properties', auth, async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const user = await User.findById(req.user._id)
      .populate({
        path: 'savedProperties',
        populate: {
          path: 'landlord',
          select: 'firstName lastName avatar phone email'
        },
        options: {
          skip: skip,
          limit: Number(limit),
          sort: { createdAt: -1 }
        }
      });

    const totalCount = user.savedProperties.length;
    const totalPages = Math.ceil(totalCount / Number(limit));

    res.json({
      success: true,
      data: {
        properties: user.savedProperties,
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
    console.error('Get saved properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching saved properties'
    });
  }
});

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', [
  auth,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
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

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
});

module.exports = router;
