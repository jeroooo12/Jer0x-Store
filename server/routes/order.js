const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const mongoose = require('mongoose');

// Crear nueva orden
router.post('/', async (req, res) => {
  const { userId, items } = req.body;

  console.log('📩 Orden recibida:');
  console.log('🧑 userId:', userId);
  console.log('🛍️ items:', items);

  try {
    const order = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      items: items.map(item => ({
        productId: new mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity
      }))
    });

    await order.save();
    console.log('✅ Orden guardada:', order);
    res.status(201).json({ message: 'Orden guardada con éxito', order });
  } catch (error) {
    console.error('❌ Error al guardar orden:', error.message);
    res.status(500).json({ error: 'Error al guardar orden' });
  }
});

// ✅ Obtener órdenes por usuario (ESTO VA FUERA DEL POST)
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('items.productId', 'name') // opcional si quieres ver el nombre
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
});

module.exports = router;

