import { Schema, Types, model } from 'mongoose';
import { Product, User } from '#models';

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product ID is required']
        },
        quantity: {
          type: Number,
          required: [true, 'Quantity is required'],
          min: [1, 'Quantity must be at least 1']
        },
        _id: false
      }
    ],
    total: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative']
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

orderSchema.pre('validate', async function () {
  if (!(await User.findOne({ _id: this.userId, isActive: true }))) {
    throw new Error(`invalid order: no active user found with id ${this.userId}`, { cause: 400 });
  }
  let sum = 0;
  for (let i = 0; i < this.products.length; i++) {
    const { productId, quantity } = this.products.at(i)!;
    const product = await Product.findOne({ _id: productId, stock: { $gte: quantity } });
    if (!product)
      throw new Error(`invalid order: no product with id ${productId} and stock greater or equal ${quantity} found`, {
        cause: 400
      });
    sum = sum + product.price * quantity;
  }
  this.total = sum;
});

export default model('Order', orderSchema);
