import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

export const config = {
  mongo: {
    uri: MONGO_URI
  },
  server: {
    port: PORT
  }
};
