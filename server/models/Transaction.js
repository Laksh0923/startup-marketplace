const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  startup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Startup',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  type: {
    type: String,
    enum: ['purchase', 'investment'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentIntent: {
    type: String,
    required: true
  },
  platformFee: {
    type: Number,
    required: true
  },
  netAmount: {
    type: Number,
    required: true
  },
  metadata: {
    paymentMethod: {
      type: String
    },
    processingFee: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      maxlength: 500
    }
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
transactionSchema.index({ buyer: 1, createdAt: -1 });
transactionSchema.index({ seller: 1, createdAt: -1 });
transactionSchema.index({ startup: 1 });
transactionSchema.index({ status: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);