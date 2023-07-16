import mongoose from "mongoose";


const StockSchema = new mongoose.Schema({
    company : String,
    ceo : String,
    stockStatus : {
        type : String,
        enum : ["available","not-available","in-progress"],
        default : "in-progress"
    },
    companyType : {
        type : String,
        enum : ["Software","Hardware","Cloud"],
        default : "Software"
    },
    companyLocation : {
        type : String,
        default : "Location to be updated shortly"
    }
}, {timestamps : true})

export default mongoose.model("Stock", StockSchema)