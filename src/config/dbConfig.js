import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

// console.log(`Database URL is ${DATABASE_URL}`);

// Open the mongoose connection to the database
mongoose.connect(DATABASE_URL, { autoIndex: false });

// Db connection
const db = mongoose.connection;

db.on('connected', () => console.log(`Mongoose connected to ${DATABASE_URL}`));

db.on('error', (err) => console.log(`Mongoose connection error: \n${err}`));

db.on('disconnected', () => console.log('Mongoose disconnected'));

const gracefulShutdown = async () => {
  try {
    await mongoose.disconnect(); // or await db.close();
    console.log('Mongoose disconnected through app termination');
  } catch (error) {
    console.error('Error during MongoDB shutdown', error);
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT', gracefulShutdown);

export default db;
