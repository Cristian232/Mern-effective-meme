import {readFile} from "fs/promises"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

import User from "./models/UserModel.js"
import Stock from "./models/StockModel.js"

try{
    await mongoose.connect(process.env.MONGO_URL)
    const user = await User.findOne({email: "non@noemail.com"})
    const jsonStocks = JSON.parse(await readFile(new URL("./utils/mockData2.json", import.meta.url)))
    const stocks = jsonStocks.map((stock)=> {
        return{...stock,createdBy:user._id}
    })
    await Stock.deleteMany({createdBy: user._id})
    await Stock.create(stocks)
    console.log("Done")
    process.exit(0)
} catch (err) {
    console.log(err)
}