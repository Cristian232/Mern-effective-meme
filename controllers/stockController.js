import Stock from "../models/StockModel.js"
import {StatusCodes} from "http-status-codes";

export const getAllStocks = async (req, res) => {
    console.log(req.user)
    const stocks = await Stock.find({createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({stocks})
}

export const createStock = async (req, res) => {
        req.body.createdBy = req.user.userId
        const stock = await Stock.create(req.body)
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