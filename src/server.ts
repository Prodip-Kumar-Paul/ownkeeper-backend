import { PrismaClient } from '@prisma/client';
import config from './config/config';
import app from './app';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// DB connection

const prisma = new PrismaClient();
prisma
  .$connect()
  .then(() => {
    console.log('DB connected successfully!');
  })
  .catch((err: Error) => console.log(err));

// console.log(config.DB_URL);

const port = process.env.PORT || config.PORT || 8080;
const server = app.listen(port, () => {
  console.log(
    `Server started on PORT: ${port} in ${process.env.NODE_ENV?.trim().toUpperCase()} mode`,
  );
});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
