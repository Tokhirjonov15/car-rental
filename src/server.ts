import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import app from './app';

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('MongoDB Connected');
    const PORT = process.env.PORT ?? 3006;
    app.listen(PORT, function() {
        console.log(`The server is running successfully on port: ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

connectDB();
