import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3333;

app.use("/api/v1", require("./routes"));

mongoose
  .connect(String(process.env.MONGODB_URL))
  .then(() => {
    app.listen(port, () => {
      console.log(`MongoDB connected `);
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
