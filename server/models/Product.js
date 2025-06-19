const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String // ← este campo es clave para categorizar
});

module.exports = mongoose.model('Product', ProductSchema);
