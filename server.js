import "express-async-errors"
import express from "express"
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config()

const app = express()

import stockRouter from "./routes/stockRouter.js";
import mongoose from "mongoose";


if (process.env.NODE_ENV === "development"){
app.use(morgan('dev'))
}

app.use(express.json())

app.get("/", (req,res) => {
    console.log(req)
    res.json({message: "Here on get request :)", data: req.body})
})

app.use("/api/v1/stocks", stockRouter)

app.use("*", (req,res) => {
    res.status(404).json({msg: "Not found"})
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({msg: "Server issues, sry"})
})

const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, (()=> console.log(`Server running on Port ${port} ... `)))
} catch (err) {
    console.log(err)
    process.exit(1)
}
