import mongoose from 'mongoose';

export function databaseIsDisabled() {
  const mongoUri = process.env.MONGODB_URI;
  return !mongoUri || mongoUri === 'your_mongodb_connection_string_here' || mongoUri.trim() === '';
}

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (databaseIsDisabled()) {
    console.log('MongoDB is disabled. Backend will run without a database.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully.');
    return true;
  } catch (error) {
    console.warn('MongoDB connection failed. Continuing in disabled mode:', error.message);
    return false;
  }
}

export function getMongoStatus() {
  return !databaseIsDisabled() && mongoose.connection.readyState === 1;
}
