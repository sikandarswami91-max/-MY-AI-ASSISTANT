import mongoose from 'mongoose';
import { ENV } from './env.js';

let isConnected = false;

/**
 * Mongoose's `ConnectOptions` is not exported directly by the mongoose types,
 * so we derive it from the `mongoose.connect` signature itself. This keeps the
 * options fully type-checked (mongo driver options + mongoose extensions)
 * without any `declare module` hacks.
 */
type MongooseConnectOptions = Parameters<typeof mongoose.connect>[1];

const connectOptions: MongooseConnectOptions = {
  serverSelectionTimeoutMS: 4000,
};

export const connectDB = async (): Promise<boolean> => {
  if (isConnected) return true;

  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, connectOptions);
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(
      `[Database Warning] Could not connect to MongoDB at ${ENV.MONGODB_URI}. Running with resilient fallback storage.`
    );
    return false;
  }
};

export const getDBStatus = (): { connected: boolean; host?: string } => {
  return {
    connected: mongoose.connection.readyState === 1,
    host: mongoose.connection.host || undefined,
  };
};
