import User from "../model/user.js";
import { comparePassword, hashPassword } from "../helper/managePassword.js";

/* Sign UP User  */

export const signUp = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password || !age) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    //check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }
    //hash password
    const hashedPassword = await hashPassword(password);

    //create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
    });

    if (!newUser) {
      return res
        .status(422)
        .json({ success: false, message: "Failed to sign up" });
    }
    //Send cookie
    const token = await newUser.generateJwtToken();
    const oneDay = 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
    });

    return res
      .status(201)
      .json({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* Sign In  */

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }
    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    //send cookie
    const token = await user.generateJwtToken();
    const oneDay = 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
    });
    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* Sign Out  */

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "User Signed out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
