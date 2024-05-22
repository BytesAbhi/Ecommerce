const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], required: true },
  images: { type: [String] } 
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
