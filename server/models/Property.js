const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['apartment', 'bedspace', 'dorm', 'house', 'condo']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be greater than 0']
  },
  priceType: {
    type: String,
    enum: ['monthly', 'weekly', 'daily'],
    default: 'monthly'
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    province: {
      type: String,
      required: [true, 'Province is required']
    },
    barangay: {
      type: String,
      default: ''
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required']
    },
    coordinates: {
      latitude: {
        type: Number,
        required: [true, 'Latitude is required'],
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90']
      },
      longitude: {
        type: Number,
        required: [true, 'Longitude is required'],
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180']
      }
    }
  },
  specs: {
    bedrooms: {
      type: Number,
      default: 1,
      min: [0, 'Bedrooms cannot be negative']
    },
    bathrooms: {
      type: Number,
      default: 1,
      min: [0, 'Bathrooms cannot be negative']
    },
    area: {
      type: Number, // in square meters
      min: [1, 'Area must be greater than 0']
    },
    maxOccupancy: {
      type: Number,
      default: 1,
      min: [1, 'Max occupancy must be at least 1']
    }
  },
  amenities: {
    furnished: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    aircon: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: false },
    laundry: { type: Boolean, default: false },
    security: { type: Boolean, default: false },
    gym: { type: Boolean, default: false },
    pool: { type: Boolean, default: false },
    nearMRT: { type: Boolean, default: false },
    petFriendly: { type: Boolean, default: false }
  },
  availability: {
    availableFrom: {
      type: Date,
      required: [true, 'Available from date is required']
    },
    availableUntil: {
      type: Date,
      default: null // null means indefinitely available
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String }, // for Cloudinary
    caption: { type: String, default: '' }
  }],
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Landlord is required']
  },
  contactInfo: {
    phone: { type: String, required: [true, 'Contact phone is required'] },
    email: { type: String, required: [true, 'Contact email is required'] },
    preferredContact: {
      type: String,
      enum: ['phone', 'email', 'both'],
      default: 'both'
    }
  },
  rules: {
    smokingAllowed: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    partiesAllowed: { type: Boolean, default: false },
    guestsAllowed: { type: Boolean, default: true },
    quietHours: {
      start: { type: String, default: '22:00' },
      end: { type: String, default: '07:00' }
    }
  },
  utilities: {
    electricityIncluded: { type: Boolean, default: false },
    waterIncluded: { type: Boolean, default: false },
    internetIncluded: { type: Boolean, default: false },
    cableIncluded: { type: Boolean, default: false }
  },
  views: {
    type: Number,
    default: 0
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'rejected'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
propertySchema.index({ 'location.coordinates': '2dsphere' });

// Index for search optimization
propertySchema.index({ 
  title: 'text', 
  description: 'text',
  'location.city': 'text',
  'location.address': 'text'
});

// Index for common queries
propertySchema.index({ propertyType: 1, price: 1 });
propertySchema.index({ 'location.city': 1, price: 1 });
propertySchema.index({ landlord: 1 });
propertySchema.index({ status: 1, 'availability.isAvailable': 1 });

// Update updatedAt on save
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate cost per square meter virtual
propertySchema.virtual('costPerSqm').get(function() {
  if (this.specs.area && this.specs.area > 0) {
    return Math.round(this.price / this.specs.area);
  }
  return null;
});

// Ensure virtual fields are serialised
propertySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Property', propertySchema);
