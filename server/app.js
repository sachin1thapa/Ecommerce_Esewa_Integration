import dotenv from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

import Transaction from './src/models/Transaction.model.js';
import { connectDB } from './src/config/db.config.js';
import { generateHmacSha256Hash, safeStringify } from './src/utils/hash.js';
import Product from './src/models/product.model.js';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5500', '*'],
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/initiate-payment', async (req, res) => {
  const {
    amount,
    productId,
    product_delivery_charge,
    product_service_charge,
    tax_amount,
    products,
  } = req.body;

  let paymentData = {
    amount,
    failure_url: process.env.FAILURE_URL,
    product_delivery_charge: product_delivery_charge ? product_delivery_charge.toString() : '0',
    product_service_charge: product_service_charge ? product_service_charge.toString() : '0',
    product_code: process.env.MERCHANT_ID,
    signed_field_names: 'total_amount,transaction_uuid,product_code',
    success_url: process.env.SUCCESS_URL,
    tax_amount: tax_amount ? tax_amount.toString() : '0',
    total_amount: amount,
    transaction_uuid: productId,
  };

  const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;

  // Generate signature for the payment data
  const signature = generateHmacSha256Hash(data, process.env.SECRET);

  paymentData = { ...paymentData, signature };

  try {
    const payment = await axios.post(process.env.ESEWAPAYMENT_URL, null, {
      params: paymentData,
    });
    const reqPayment = JSON.parse(safeStringify(payment));
    console.log('Payment:', reqPayment);
    if (reqPayment.status === 200) {
      const result = await Product.insertMany(products);
      const productIds = result.map((product) => product._id);
      const transaction = await Transaction.create({
        product_id: productId,
        amount,
        products: productIds,
      });

      return res.send({
        url: reqPayment.request.res.responseUrl,
      });
    }
  } catch (error) {
    res.send(error);
  }
});

// Route to handle payment status update
app.post('/payment-status', async (req, res) => {
  const { product_id } = req.body;
  try {
    const transaction = await Transaction.findOne({ product_id });

    if (!transaction) {
      return res.status(400).json({ message: 'Transaction not found' });
    }

    // default payment data
    const paymentData = {
      product_code: 'EPAYTEST',
      total_amount: transaction.amount,
      transaction_uuid: transaction.product_id,
    };

    const response = await axios.get(process.env.ESEWAPAYMENT_STATUS_CHECK_URL, {
      params: paymentData,
    });
    const paymentStatusCheck = JSON.parse(safeStringify(response));

    // completion of the transaction
    if (paymentStatusCheck.status === 200 && paymentStatusCheck.data.status === 'COMPLETE') {
      // Update the transaction status
      transaction.status = paymentStatusCheck.data.status;
      await transaction.save();
      res.status(200).json({ message: 'Transaction status updated successfully' });
    }
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
