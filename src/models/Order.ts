import { Schema, model } from 'mongoose';
import { Product } from '#models';

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
        }
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
  const productIds = this.products.map(p => p.productId);

  const products = await Product.find({
    _id: { $in: productIds }
  }).select('price');

  const priceMap = new Map(products.map(p => [p._id.toString(), p.price]));

  this.total = this.products.reduce((sum, item) => {
    const price = priceMap.get(item.productId.toString());
    if (!price) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    return sum + price * item.quantity;
  }, 0);
});

export default model('Order', orderSchema);
