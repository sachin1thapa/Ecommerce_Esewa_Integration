
import mongoose, { Schema, model, Types } from 'mongoose';


const transactionSchema = new Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ['PENDING', 'COMPLETE', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Transaction = model('Transaction', transactionSchema);

export default Transaction;
