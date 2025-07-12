import mongoose from 'mongoose';

// TODO: move to an env
const url = `mongodb://root:example@mongo:27017/gameDb?authSource=admin`;

mongoose.set('strictQuery', false);

export const connectToDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default mongoose;
