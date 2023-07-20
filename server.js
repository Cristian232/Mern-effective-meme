import "express-async-errors"
import express from "express"
import morgan from "morgan";
import * as dotenv from "dotenv";
import stockRouter from "./routes/stockRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import {authenticateUser} from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from "cloudinary";

dotenv.config()
const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname,"./public")))
app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
    console.log(req)
    res.json({message: "Here on get request :)", data: req.body})
})


app.use("/api/v1/stocks", authenticateUser, stockRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/auth", authRouter)

app.use("*", (req, res) => {
    res.status(404).json({msg: "Not found"})
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, (() => console.log(`Server running on Port ${port} ... `)))
} catch (err) {
    console.log(err)
    process.exit(1)
}
