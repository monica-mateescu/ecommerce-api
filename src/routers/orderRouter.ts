import { Router } from 'express';
import { getOrders, createOrder, getOrderById, updateOrder, deleteOrder } from '#controllers';
import { validateBodyZod, validateObjectIdParam } from '#middleware';
import { orderInputSchema } from '#schemas';

const orderRouter = Router();

orderRouter.get('/', getOrders);
orderRouter.post('/', validateBodyZod(orderInputSchema), createOrder);
orderRouter.get('/:id', validateObjectIdParam('id'), getOrderById);
orderRouter.put('/:id', validateObjectIdParam('id'), validateBodyZod(orderInputSchema), updateOrder);
orderRouter.delete('/:id', validateObjectIdParam('id'), deleteOrder);

export default orderRouter;
