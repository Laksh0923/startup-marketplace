const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const Startup = require('../models/Startup');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create payment intent
router.post('/create-intent', [auth], [
  body('startupId').isMongoId(),
  body('amount').isNumeric({ min: 1000 }),
  body('type').isIn(['purchase', 'investment'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { startupId, amount, type } = req.body;

    // Verify startup exists and is available
    const startup = await Startup.findById(startupId).populate('founder');
    if (!startup || startup.status !== 'active') {
      return res.status(404).json({ message: 'Startup not found or not available' });
    }

    // Calculate platform fee (5% of transaction)
    const platformFee = Math.round(amount * 0.05);
    const netAmount = amount - platformFee;

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: 'usd',
      metadata: {
        startupId,
        buyerId: req.user._id.toString(),
        sellerId: startup.founder._id.toString(),
        type
      }
    });

    // Create transaction record
    const transaction = new Transaction({
      startup: startupId,
      buyer: req.user._id,
      seller: startup.founder._id,
      amount,
      type,
      paymentIntent: paymentIntent.id,
      platformFee,
      netAmount,
      status: 'pending'
    });

    await transaction.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      transactionId: transaction._id
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Confirm payment
router.post('/confirm', [auth], [
  body('paymentIntentId').isString(),
  body('transactionId').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentIntentId, transactionId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update transaction status
      const transaction = await Transaction.findByIdAndUpdate(
        transactionId,
        {
          status: 'completed',
          completedAt: new Date(),
          'metadata.paymentMethod': paymentIntent.payment_method
        },
        { new: true }
      );

      // Update startup status if it's a purchase
      if (transaction.type === 'purchase') {
        await Startup.findByIdAndUpdate(transaction.startup, {
          status: 'sold'
        });
      }

      res.json({
        message: 'Payment confirmed successfully',
        transaction
      });
    } else {
      // Update transaction as failed
      await Transaction.findByIdAndUpdate(transactionId, {
        status: 'failed'
      });

      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get payment history
router.get('/history', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get transactions where user is buyer or seller
    const transactions = await Transaction.find({
      $or: [
        { buyer: req.user._id },
        { seller: req.user._id }
      ]
    })
    .populate('startup', 'name')
    .populate('buyer', 'profile.firstName profile.lastName')
    .populate('seller', 'profile.firstName profile.lastName')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Transaction.countDocuments({
      $or: [
        { buyer: req.user._id },
        { seller: req.user._id }
      ]
    });

    res.json({
      transactions,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;