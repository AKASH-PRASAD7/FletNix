import mongoose from "mongoose";
import variables from "../config/conf.js";

const connectDB = async () => {
  try {
    mongoose.connect(variables.MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (err) {
    console.log("MongoDb Connection Error: ", err);
  }
};

export default connectDB;
