import Express from "express";
import cors from "cors";
import DbConnect from "./helper/DbConnect.js";
import cookieParser from "cookie-parser";
import variables from "./config/conf.js";
import authApi from "./api/auth.js";

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(cookieParser());

app.use((err, _, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format in the request body",
    });
  }
  next(err);
});

const PORT = variables.PORT || 8000;

app.get("/", (_, res) => {
  res.send("FletNix Server is running!");
});

//Routing

app.use("/api/auth", authApi);

app.listen(PORT, async () => {
  try {
    await DbConnect();
    console.log(`Server is running on port: ${PORT}`);
  } catch (err) {
    console.log("Failed to Start server: ", err);
  }
});
