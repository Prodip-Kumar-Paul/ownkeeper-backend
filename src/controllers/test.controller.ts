import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const { user } = new PrismaClient();
const testServer: RequestHandler = async (req, res, next) => {
  try {
    // const newUser = await user.create({
    //   data: {
    //     email: 'prodip@test.com',
    //   },
    // });

    const existingUser = await user.findMany();

    res.json({
      status: true,
      message: 'Hello from test server',
      data: existingUser,
    });
  } catch (err) {
    next(err);
  }
};

export default testServer;
