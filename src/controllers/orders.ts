import { type RequestHandler } from 'express';
import { Types } from 'mongoose';
import { Order, Product, User } from '#models';
import type { orderSchema, orderInputSchema } from '#schemas';
import { z } from 'zod/v4';

type OrderInputDTO = z.infer<typeof orderInputSchema>;
type OrderDTO = z.infer<typeof orderSchema>;

export const getOrders: RequestHandler<{}, OrderDTO[]> = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export const createOrder: RequestHandler<{}, OrderDTO, OrderInputDTO> = async (req, res) => {
  const { userId, products } = req.body;

  const order = new Order();
  order.userId = userId;
  order.set('products', products);

  await order.save();

  const populatedOrder = await order.populate([
    { path: 'userId', select: 'firstName lastName email' },
    { path: 'products.productId', select: 'name description price' }
  ]);
  res.json(populatedOrder);
};

export const getOrderById: RequestHandler<{ id: string }, OrderDTO> = async (req, res) => {
  const {
    params: { id }
  } = req;

  const order = await Order.findById(id).populate([
    { path: 'userId', select: 'firstName lastName email' },
    { path: 'products.productId', select: 'name description price' }
  ]);

  if (!order) {
    throw new Error('Order not found', { cause: 404 });
  }

  res.json(order);
};

export const updateOrder: RequestHandler<{ id: string }, OrderDTO, OrderInputDTO> = async (req, res) => {
  const {
    body: { userId, products },
    params: { id }
  } = req;

  const order = await Order.findById(id);
  if (!order) throw new Error('Order not found', { cause: 404 });

  order.userId = userId;
  order.set('products', products);

  await order.save();

  const populatedOrder = await order.populate([
    { path: 'userId', select: 'firstName lastName email' },
    { path: 'products.productId', select: 'name description price' }
  ]);
  res.json(populatedOrder);
};

export const deleteOrder: RequestHandler<{ id: string }> = async (req, res) => {
  const {
    params: { id }
  } = req;
  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new Error('Order not found', { cause: 404 });
  res.json({ message: 'Order deleted' });
};
