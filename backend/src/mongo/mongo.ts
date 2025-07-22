import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false);

export const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://root:example@mongo:27017/gameDb?authSource=admin'
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default mongoose;
