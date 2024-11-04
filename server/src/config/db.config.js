//later we will serve 'mongodb_connection_url' from .env

import { connect } from 'mongoose';

export const connectDB = () => {
  try {
    console.log('object');
    console.log(process.env.MONGO_URI);
    connect(process.env.MONGO_URI).then((res) => {
      console.log('MongoDB connected successfully');
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
