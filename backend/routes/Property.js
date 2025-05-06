// backend/routes/Property.js (Using Local Disk Storage)

const router = require('express').Router();
const Property = require('../models/property.js'); // Verify this path
const multer = require('multer');
const path = require('path'); // Needed for path manipulation
const fs = require('fs'); // Needed for creating directory

// --- Multer Configuration for Disk Storage ---

// Define the destination directory for uploads
const uploadDir = path.join(__dirname, '..', 'public', 'uploads'); // Store in backend/public/uploads

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created upload directory: ${uploadDir}`);
}

// Configure disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to the 'backend/public/uploads' directory
  },
  filename: function (req, file, cb) {
    // Create a unique filename: fieldname-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter (optional: accept only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error('Not an image! Please upload only images.'), false); // Reject other files
  }
};

// Create multer instance with disk storage and filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

// --- POST /add Route (For Saving New Properties) ---
router.post(
  '/add',
  // Use multer middleware configured for disk storage
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'interiorImages', maxCount: 10 } // Limit interior images if desired
  ]),
  async (req, res) => {
    console.log('--- Add Property Handler ---');
    // console.log('Received Text Fields (req.body):', JSON.stringify(req.body, null, 2));
    // console.log('Received Files (req.files):', req.files); // Files now contain path info

    try {
      const {
        title, description, location, price, bedrooms, bathrooms, sqft, propertyType, transactionType,
      } = req.body;

      // Data Type Conversion
      const bedroomsNum = parseInt(bedrooms, 10);
      const bathroomsNum = parseFloat(bathrooms);
      const sqftNum = parseInt(sqft, 10);

      // Validation
      if (isNaN(bedroomsNum) || isNaN(bathroomsNum) || isNaN(sqftNum)) {
        console.error("Validation Error: Invalid number format received.", { bedrooms, bathrooms, sqft });
        return res.status(400).json({ message: 'Invalid number format for bedrooms, bathrooms, or sqft.' });
      }

      // --- Get REAL File Paths from req.files ---
      let mainImageUrl = null;
      let interiorImageUrls = [];

      // Check if mainImage was uploaded and get its path
      if (req.files && req.files.mainImage && req.files.mainImage[0]) {
        // Construct the relative path to be stored (e.g., /uploads/mainImage-12345.jpg)
        // req.files.mainImage[0].path contains the full disk path
        // We want to store the path relative to the 'public' directory
        mainImageUrl = '/uploads/' + path.basename(req.files.mainImage[0].path);
        console.log('Main image saved:', mainImageUrl);
      } else {
          console.log('No main image uploaded.');
          // Optional: return error if main image is required
          // return res.status(400).json({ message: 'Main image is required.' });
      }

      // Check if interiorImages were uploaded and get their paths
      if (req.files && req.files.interiorImages && req.files.interiorImages.length > 0) {
        interiorImageUrls = req.files.interiorImages.map(file => {
            const relativePath = '/uploads/' + path.basename(file.path);
            console.log('Interior image saved:', relativePath);
            return relativePath;
        });
      } else {
          console.log('No interior images uploaded.');
           // Optional: return error if interior images are required
          // return res.status(400).json({ message: 'At least one interior image is required.' });
      }
      // --- End File Path Handling ---

      // Create new Property document with REAL relative image paths
      const newProperty = new Property({
        title, description, location, price,
        bedrooms: bedroomsNum,
        bathrooms: bathroomsNum,
        sqft: sqftNum,
        propertyType, transactionType,
        mainImage: mainImageUrl,       // Store relative path like /uploads/image.jpg
        interiorImages: interiorImageUrls // Store array of relative paths
      });

      // Save to database
      const savedProperty = await newProperty.save();
      console.log('Property saved successfully:', savedProperty._id);

       // Exclude sensitive data if necessary before sending back
      const propertyResponse = savedProperty.toObject();
      // delete propertyResponse.__v; // example

      res.status(201).json(propertyResponse);

    } catch (err) {
      console.error('!!! Error saving property !!!:', err);
       // Handle potential multer errors (like file type)
       if (err instanceof multer.MulterError) {
           return res.status(400).json({ message: `File upload error: ${err.message}` });
       } else if (err.message.includes('Not an image')) { // Handle custom filter error
           return res.status(400).json({ message: err.message });
       }
      res.status(500).json({ message: 'Server error while adding property.', error: err.message });
    }
  }
);

// --- GET / Route (For Fetching All Properties) ---
// This route remains the same as before
router.get('/', async (req, res) => {
  console.log('--- Get All Properties Handler ---');
  try {
    const properties = await Property.find({});
    console.log(`Found ${properties.length} properties.`);
    res.status(200).json(properties);
  } catch (err) {
    console.error("!!! Error fetching properties !!!:", err);
    res.status(500).json({ message: "Server error while fetching properties", error: err.message });
  }
});

module.exports = router;
