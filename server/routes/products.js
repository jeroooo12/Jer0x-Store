const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // ✅ importa el modelo real

// 🆕 POST /api/products → crear producto
router.post('/', async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const newProduct = new Product({ name, price, image, category });
    await newProduct.save();

    res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  } catch (error) {
    console.error('❌ Error al crear producto:', error.message);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// 🆕 GET /api/products → obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('❌ Error al obtener productos:', error.message);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// ✅ GET /api/products/categoria/:categoria → obtener por categoría (ajustado a frontend)
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const categoria = req.params.categoria;
    const products = await Product.find({ category: categoria }); // usar campo 'category' del modelo
    res.json(products);
  } catch (error) {
    console.error('❌ Error al filtrar productos:', error.message);
    res.status(500).json({ error: 'Error al filtrar productos' });
  }
});

module.exports = router;
