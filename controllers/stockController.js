import Stock from "../models/StockModel.js"
import {StatusCodes} from "http-status-codes";
import {NotFoundError} from "../errors/customErrors.js";

export const getAllStocks = async (req, res) => {
    const stocks = await Stock.find({})
    res.status(StatusCodes.OK).json({stocks})
}

export const createStock = async (req, res) => {
        const {company, ceo, stockStatus, companyType, companyLocation} = req.body;
        const stock = await Stock.create({company, ceo, stockStatus, companyType, companyLocation })
        res.status(StatusCodes.CREATED).json({stock})
}

export const getStock = async (req, res) => {
    const {id} = req.params;
    const stock = await Stock.findById(id);
    res.status(StatusCodes.OK).json(stock)
}

export const updateStock = async (req, res) => {
    const {id} = req.params
    const updatedStock = await Stock.findByIdAndUpdate(id,req.body, {
        new: true
    })
    res.status(StatusCodes.OK).json({msg: "Stock modified", stocks: updatedStock})
}

export const deleteStock = async (req, res) => {
    const {id} = req.params
    const removedStock = await Stock.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({msg: "Stock deleted", stocks: removedStock})
}