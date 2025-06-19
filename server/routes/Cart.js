const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// 📥 Agregar o actualizar un producto al carrito
router.post('/:userId/add', async (req, res) => {
  const { productId, name, price, quantity, image } = req.body;
  const userId = req.params.userId;

  if (!userId || !productId) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, name, price, quantity, image }]
      });
    } else {
      const existingItem = cart.items.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, quantity, image });
      }
    }

    await cart.save();
    res.status(200).json({ cart: cart.items });
  } catch (error) {
    console.error('❌ Error al agregar producto:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

// 📤 Obtener carrito de un usuario
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json({ cart: [] });

    res.status(200).json({ cart: cart.items });
  } catch (error) {
    console.error('❌ Error al obtener carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// 🔁 Actualizar cantidad de un producto
router.put('/:userId/:productId', async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const item = cart.items.find(item => item.productId === req.params.productId);
    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Cantidad actualizada' });
  } catch (error) {
    console.error('❌ Error al actualizar cantidad:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// ❌ Eliminar un producto del carrito
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    await cart.save();

    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
});

// DELETE /api/cart/:userId/clear → vaciar todo el carrito
router.delete('/:userId/clear', async (req, res) => {
  try {
    const userId = req.params.userId;
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    console.error('❌ Error al vaciar carrito:', error.message);
    res.status(500).json({ error: 'Error al vaciar carrito' });
  }
});

module.exports = router;
