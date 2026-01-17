const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Startup = require('../models/Startup');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all startups with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('industry').optional().isString(),
  query('category').optional().isString(),
  query('minPrice').optional().isNumeric(),
  query('maxPrice').optional().isNumeric(),
  query('search').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { status: 'active' };

    if (req.query.industry) {
      filter.industry = req.query.industry;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter['pricing.amount'] = {};
      if (req.query.minPrice) {
        filter['pricing.amount'].$gte = parseFloat(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filter['pricing.amount'].$lte = parseFloat(req.query.maxPrice);
      }
    }

    // Text search
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    const startups = await Startup.find(filter)
      .populate('founder', 'profile.firstName profile.lastName profile.company')
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Startup.countDocuments(filter);

    res.json({
      startups,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get startups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured startups
router.get('/featured', async (req, res) => {
  try {
    const startups = await Startup.find({ status: 'active', featured: true })
      .populate('founder', 'profile.firstName profile.lastName profile.company')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({ startups });
  } catch (error) {
    console.error('Get featured startups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single startup
router.get('/:id', async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id)
      .populate('founder', 'profile.firstName profile.lastName profile.company profile.bio');

    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    // Increment view count
    startup.metrics.views += 1;
    await startup.save();

    res.json({ startup });
  } catch (error) {
    console.error('Get startup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create startup (founders only)
router.post('/', [auth, requireRole(['founder'])], [
  body('name').trim().isLength({ min: 1, max: 100 }),
  body('description').trim().isLength({ min: 10, max: 2000 }),
  body('industry').isIn([
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education',
    'Real Estate', 'Food & Beverage', 'Transportation', 'Entertainment',
    'Energy', 'Manufacturing', 'Agriculture', 'Other'
  ]),
  body('category').isIn([
    'SaaS', 'Mobile App', 'Web Platform', 'E-commerce Store',
    'Marketplace', 'AI/ML', 'Blockchain', 'IoT', 'Fintech',
    'Healthtech', 'Edtech', 'Other'
  ]),
  body('pricing.type').isIn(['sale', 'investment']),
  body('pricing.amount').isNumeric({ min: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const startupData = {
      ...req.body,
      founder: req.user._id
    };

    const startup = new Startup(startupData);
    await startup.save();

    await startup.populate('founder', 'profile.firstName profile.lastName profile.company');

    res.status(201).json({
      message: 'Startup created successfully',
      startup
    });
  } catch (error) {
    console.error('Create startup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update startup (founder only)
router.put('/:id', [auth, requireRole(['founder'])], async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    // Check if user owns this startup
    if (startup.founder.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedStartup = await Startup.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('founder', 'profile.firstName profile.lastName profile.company');

    res.json({
      message: 'Startup updated successfully',
      startup: updatedStartup
    });
  } catch (error) {
    console.error('Update startup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete startup (founder only)
router.delete('/:id', [auth, requireRole(['founder'])], async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    // Check if user owns this startup
    if (startup.founder.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Startup.findByIdAndDelete(req.params.id);

    res.json({ message: 'Startup deleted successfully' });
  } catch (error) {
    console.error('Delete startup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;