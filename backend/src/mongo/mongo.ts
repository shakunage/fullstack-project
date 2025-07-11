import mongoose from 'mongoose';

const url = `mongodb://root:example@mongo:27017/gameDb?authSource=admin`;

mongoose.set('strictQuery', false);

const connectToDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

void connectToDB();

export default mongoose;
