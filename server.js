import "express-async-errors"
import express from "express"
import morgan from "morgan";
import * as dotenv from "dotenv";
import stockRouter from "./routes/stockRouter.js";
import authRouter from "./routes/authRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import {authenticateUser} from "./middleware/authMiddleware.js";
import {cookie} from "express-validator";
import cookieParser from "cookie-parser";

dotenv.config()
const app = express()

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
    console.log(req)
    res.json({message: "Here on get request :)", data: req.body})
})

app.use("/api/v1/stocks", authenticateUser, stockRouter)
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
