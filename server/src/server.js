import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DbConnect from "./helper/DbConnect.js";
dotenv.config();

const app = Express();
app.use(cors());
app.use(Express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format in the request body",
    });
  }
  next(err);
});

const PORT = process.env.PORT || 8000;

app.get("/", (_, res) => {
  res.send("FletNix Server is running!");
});

app.listen(PORT, async () => {
  try {
    await DbConnect();
    console.log(`Server is running on port: ${PORT}`);
  } catch (err) {
    console.log("Failed to Start server: ", err);
  }
});
