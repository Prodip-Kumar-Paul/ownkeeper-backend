import dotenv from 'dotenv';
import path from 'node:path';
import ConfigData from '../types/configData';

dotenv.config({
  path: path.join(__dirname, `config.${process.env.NODE_ENV?.trim()}.env`),
});

const configProd: ConfigData = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};

export default configProd;
