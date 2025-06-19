const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;


// 🔌 Middlewares
app.use(cors());
app.use(express.json());

// ✅ Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

// 📦 Modelo de Producto
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String, 
});
const Product = mongoose.model('Product', ProductSchema);

// 🛡️ Rutas
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/Cart');
const orderRoutes = require('./routes/order');

// 🧭 Uso de rutas
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// 🛍️ Ruta para crear productos 
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, image, category } = req.body;
    const newProduct = new Product({ name, price, image, category });
    await newProduct.save();
    res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar producto', detail: err.message });
  }
});

// 🧭 Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// 🔍 Ruta para obtener productos por categoría
app.get('/api/products/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar productos' });
  }
});

// 🌐 Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

// 🚀 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
