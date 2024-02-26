import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import variables from "../config/conf.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
});

//method
userSchema.methods.generateJwtToken = function () {
  try {
    return jwt.sign({ user: this._id.toString() }, variables.SECRET_KEY);
  } catch (error) {
    return error;
  }
};

const User = mongoose.model("User", userSchema);
export default User;
