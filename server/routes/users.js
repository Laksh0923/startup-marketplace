const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Startup = require('../models/Startup');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', [auth], [
  body('profile.firstName').optional().trim().isLength({ min: 1 }),
  body('profile.lastName').optional().trim().isLength({ min: 1 }),
  body('profile.company').optional().trim(),
  body('profile.bio').optional().trim().isLength({ max: 500 }),
  body('profile.phone').optional().trim(),
  body('profile.location').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = {};
    
    // Only update provided fields
    if (req.body.profile) {
      Object.keys(req.body.profile).forEach(key => {
        if (req.body.profile[key] !== undefined) {
          updateData[`profile.${key}`] = req.body.profile[key];
        }
      });
    }

    if (req.body.preferences) {
      Object.keys(req.body.preferences).forEach(key => {
        if (req.body.preferences[key] !== undefined) {
          updateData[`preferences.${key}`] = req.body.preferences[key];
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    const dashboardData = {
      user: req.user
    };

    if (req.user.role === 'founder') {
      // Get founder's startups
      const startups = await Startup.find({ founder: req.user._id })
        .sort({ createdAt: -1 });

      const stats = {
        totalStartups: startups.length,
        activeStartups: startups.filter(s => s.status === 'active').length,
        totalViews: startups.reduce((sum, s) => sum + s.metrics.views, 0),
        totalInquiries: startups.reduce((sum, s) => sum + s.metrics.inquiries, 0)
      };

      dashboardData.startups = startups;
      dashboardData.stats = stats;
    } else {
      // Buyer dashboard - could include saved startups, recent views, etc.
      dashboardData.stats = {
        savedStartups: 0,
        recentViews: 0
      };
    }

    res.json(dashboardData);
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;