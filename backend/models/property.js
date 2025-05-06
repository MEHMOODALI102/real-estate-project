const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  bedrooms: { type: Number, required: true }, // Changed to Number
  bathrooms: { type: Number, required: true }, // Changed to Number
  sqft: { type: Number, required: true }, // Changed to Number
  propertyType: { type: String, required: true },
  transactionType: { type: String, required: true },
  mainImage: { type: String },
  interiorImages: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);