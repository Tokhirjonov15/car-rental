import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import app from './app';

mongoose.set('strictQuery', false);

const mongoUri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_PROD
    : process.env.MONGO_URL;
const dbMode = process.env.NODE_ENV === "production" ? "production" : "development";

const connectDB = async () => {
  try {
    if (!mongoUri) {
      throw new Error("MongoDB URI is not set for the current environment");
    }

    await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected (${dbMode} DB)`);
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