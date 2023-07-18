import mongoose from "mongoose";
import {COMPANY_TYPE, STOCK_STATUS} from "../utils/constants.js";


const StockSchema = new mongoose.Schema({
    company : String,
    ceo : String,
    stockStatus : {
        type : String,
        enum : Object.values(STOCK_STATUS),
        default : STOCK_STATUS.IN_PROGRESS
    },
    companyType : {
        type : String,
        enum : Object.values(COMPANY_TYPE),
        default : COMPANY_TYPE.SOFTWARE
    },
    companyLocation : {
        type : String,
        default : "Location to be updated shortly"
    },
    createdBy: {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true})

export default mongoose.model("Stock", StockSchema)