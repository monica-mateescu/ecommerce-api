import { type RequestHandler } from 'express';
import { Order, Product, User } from '#models';
import type { orderSchema, orderInputSchema } from '#schemas';
import { z } from 'zod/v4';
import type { Types } from 'mongoose';

type OrderInputDTO = z.infer<typeof orderInputSchema>;
type OrderDTO = z.infer<typeof orderSchema>;

export const getOrders: RequestHandler<{}, OrderDTO[]> = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export const createOrder: RequestHandler<{}, OrderDTO, OrderInputDTO> = async (req, res) => {
  const { userId, products } = req.body;

  checkIntegrity(userId, products);

  const order = new Order();
  order.userId = userId;
  order.set('products', products);
  order.total = 0;
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

  checkIntegrity(userId, products);

  order.userId = userId;
  order.set('products', products);
  order.total = 0;
  await order.save();

  const populatedOrder = await order.populate([
    { path: 'userId', select: 'firstName lastName email' },
    { path: 'productId', select: 'name description price' }
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

function checkIntegrity(userId: Types.ObjectId, products: { productId: Types.ObjectId; quantity: number }[]) {
  if (!User.findOne({ id: userId, isActive: true }))
    throw new Error(`invalid order: no active user found with id ${userId}`, { cause: 400 });
  products.forEach(product => {
    if (!Product.findOne({ id: product.productId, stock: { $gte: product.quantity } }))
      throw new Error(
        `invalid order: no with id ${product.productId} and stock greater or equal ${product.quantity} found`,
        {
          cause: 400
        }
      );
  });
}
