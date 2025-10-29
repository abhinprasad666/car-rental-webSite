import express from "express";
import dotenv from "dotenv";
import { DB_Connect } from "./src/config/DB_Connect.js";
import { router } from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();


app.use(
   cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,                //allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],  //allowed headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount all routes under the base path `/api/v1`
app.use("/api/v1", router);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
  DB_Connect();
});
