const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Ensure upload directories exist
const uploadDirs = ['uploads/images', 'uploads/documents'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'images' || file.fieldname === 'logo') {
      cb(null, 'uploads/images');
    } else {
      cb(null, 'uploads/documents');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'images' || file.fieldname === 'logo') {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  } else {
    // Accept documents
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, Word, and PowerPoint files are allowed'), false);
    }
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Upload images
router.post('/images', [auth, upload.array('images', 5)], (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const fileUrls = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `/uploads/images/${file.filename}`,
      size: file.size
    }));

    res.json({
      message: 'Images uploaded successfully',
      files: fileUrls
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

// Upload documents
router.post('/documents', [auth, upload.array('documents', 3)], (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const fileUrls = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `/uploads/documents/${file.filename}`,
      size: file.size,
      type: file.mimetype
    }));

    res.json({
      message: 'Documents uploaded successfully',
      files: fileUrls
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

// Delete file
router.delete('/:filename', auth, (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join('uploads/images', filename);
    const documentPath = path.join('uploads/documents', filename);

    // Try to delete from both directories
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      return res.json({ message: 'File deleted successfully' });
    }

    if (fs.existsSync(documentPath)) {
      fs.unlinkSync(documentPath);
      return res.json({ message: 'File deleted successfully' });
    }

    res.status(404).json({ message: 'File not found' });
  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).json({ message: 'Server error during deletion' });
  }
});

module.exports = router;