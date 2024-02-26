import dotenv from "dotenv";
dotenv.config();

const variables = {
  PORT: String(process.env.PORT),
  MONGODB_URI: String(process.env.MONGODB_URI),
  SECRET_KEY: String(process.env.SECRET_KEY),
};

export default variables;
