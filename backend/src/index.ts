import express from 'express';
import { prisma } from './dbserver/dbserver.ts';

const app = express();
const PORT = 8080;

const start = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
};

start();