const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  industry: {
    type: String,
    required: true,
    enum: [
      'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education',
      'Real Estate', 'Food & Beverage', 'Transportation', 'Entertainment',
      'Energy', 'Manufacturing', 'Agriculture', 'Other'
    ]
  },
  category: {
    type: String,
    required: true,
    enum: [
      'SaaS', 'Mobile App', 'Web Platform', 'E-commerce Store',
      'Marketplace', 'AI/ML', 'Blockchain', 'IoT', 'Fintech',
      'Healthtech', 'Edtech', 'Other'
    ]
  },
  pricing: {
    type: {
      type: String,
      enum: ['sale', 'investment'],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1000
    },
    currency: {
      type: String,
      default: 'USD'
    },
    negotiable: {
      type: Boolean,
      default: true
    }
  },
  details: {
    stage: {
      type: String,
      enum: ['idea', 'mvp', 'growth', 'established'],
      default: 'mvp'
    },
    employees: {
      type: Number,
      min: 0,
      default: 1
    },
    revenue: {
      type: Number,
      min: 0,
      default: 0
    },
    founded: {
      type: Date
    },
    location: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    technologies: [{
      type: String,
      trim: true
    }]
  },
  media: {
    logo: {
      type: String
    },
    images: [{
      type: String
    }],
    pitchDeck: {
      type: String
    },
    documents: [{
      name: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    }]
  },
  metrics: {
    views: {
      type: Number,
      default: 0
    },
    saves: {
      type: Number,
      default: 0
    },
    inquiries: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'sold', 'inactive'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
startupSchema.index({ industry: 1, category: 1 });
startupSchema.index({ 'pricing.amount': 1 });
startupSchema.index({ status: 1, featured: -1 });
startupSchema.index({ createdAt: -1 });

// Text search index
startupSchema.index({
  name: 'text',
  description: 'text',
  'details.technologies': 'text'
});

module.exports = mongoose.model('Startup', startupSchema);