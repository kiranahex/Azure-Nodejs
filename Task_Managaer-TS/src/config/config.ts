import dotenv from "dotenv";
dotenv.config();

const PORT_NUMBER = process.env.PORT_NUMBER
  ? Number(process.env.PORT_NUMBER)
  : 3000;
const MONGO_URI = process.env.MONGO_URI
  ? String(process.env.MONGO_URI)
  : "mongodb://localhost:27017/TsNewApi";

export const config = {
  mongo: {
    MONGO_URI,
  },
  server: {
    PORT_NUMBER,
  },
}